const express = require("express");
const axios = require("axios");
const animeReview = require("../models/animeReview");

const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("login");
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("signup");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//code after signing in
router.get("/dashboard", isAuthenticated, async (req, res) => {
  const allInfo = await animeReview.findAll({
    raw: true,
    where: {
      user_id: req.user.id,
    },
    order: [["updatedAt", "DESC"]],
  });

  const updates = allInfo.slice(0, 3);
  res.render("dashboard", { displayName: req.user.display_name, updates });
});

router.post("/dashboard", async (req, res) => {
  const { animeName } = req.body;
  try {
    const response = await axios.get(
      `https://kitsu.io/api/edge/anime?filter[text]=${animeName}&limit=10`
    );
    // const results = {
    //   id: response.data.id,
    //   tinyImage: response.data.attributes.posterImage.tiny,
    //   title: response.data.attributes.canonicalTitle,
    //   synopsis: response.data.attributes.synopsis,
    // }
    res.render("dashboard", { results: response.data.data });
    // res.end()
  } catch (error) {
    console.error("dashboard error", error.message);
    //recode to anime error
    res.end();
  }
});

router.get("/titles/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userReview = await animeReview.findOne({
      raw: true,
      where: {
        unique_id: `${req.user.id}-${id}`,
      },
    });

    const dbReviewObject = {};
    if (userReview !== null) {
      const { review, watchStatus, rating } = userReview;
      dbReviewObject.review = review;
      dbReviewObject.rating = rating;
      dbReviewObject.watchStatus = watchStatus;
    }
    //if not null hen use database

    const response = await axios.get(`https://kitsu.io/api/edge/anime/${id}`);

    const result = {
      title: response.data.data.attributes.canonicalTitle,
      synopsis: response.data.data.attributes.synopsis,
      image: response.data.data.attributes.posterImage.small,
      type: response.data.data.attributes.showType,
      episodes: response.data.data.attributes.episodeCount,
      release: response.data.data.attributes.startDate,
      id: response.data.data.id,
      ...dbReviewObject,
    };
    //add if statement for existing comments here (where userid and app id) use find1 will return object if not found will return 'null' so if (search = null), if does have comment make sure to parse that in alongside result
    res.render("titlePage", result);
    // res.end()
  } catch (error) {
    console.error(error.message);
    //recode to anime error
    res.end();
  }
});

router.get("/anime/allanimelist", async (req, res) => {
  try {
    const allInfo = await animeReview.findAll({
      raw: true,
      where: {
        user_id: req.user.id,
      },
    });

    res.render("allAnimeList", { allInfo });
  } catch (error) {
    console.error(error.message);
    res.end();
  }
});

router.post("/titles/:id", async (req, res) => {
  const { id } = req.params;
  const { userComment, status, rating } = req.body;
  const response = await axios.get(`https://kitsu.io/api/edge/anime/${id}`);

  const result = {
    review: userComment,
    rating: rating,
    user_id: req.user.id,
    watchStatus: status,
    unique_id: `${req.user.id}-${response.data.data.id}`,
    title: response.data.data.attributes.canonicalTitle,
 
 
    release_date: response.data.data.attributes.startDate,
    apiID: response.data.data.id,
  };
  await animeReview.upsert(result);
  res.redirect("/dashboard");
});

module.exports = router;
