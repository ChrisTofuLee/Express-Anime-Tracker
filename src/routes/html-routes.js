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
      user_id: req.user.id
    },
    order: [
      ['updatedAt', 'DESC'],
    ],
  });

  const updates = allInfo.slice(0, 3)
  res.render("dashboard", { displayName: req.user.display_name, updates });
});

router.post("/dashboard", async (req, res) => {
  const { animeName } = req.body;
  console.log(animeName);
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v3/search/anime?q=${animeName}&limit=10`
    );
    res.render("dashboard", { results: response.data.results });
    // res.end()
  } catch (error) {
    console.error(error.message);
    //recode to anime error
    res.end();
  }
});

router.get("/titles/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.jikan.moe/v3/anime/${id}`);

    const result = {
      title: response.data.title,
      synopsis: response.data.synopsis,
      image: response.data.image_url,
      type: response.data.type,
      episodes: response.data.episodes,
      release: response.data.aired.from,
      id: response.data.mal_id,
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
  const allInfo = await animeReview.findAll({ raw: true });
  console.table(allInfo);
  //  res.render("allAnimeList", allInfo)
  res.end();
});

router.post("/titles/:id", async (req, res) => {
  const { id } = req.params;
  const { userComment } = req.body
  console.log(req.body);
  const response = await axios.get(`https://api.jikan.moe/v3/anime/${id}`);

  const result = {
    title: response.data.title,
    review: userComment,
    image: response.data.image_url,
    rating: 2,
    user_id: req.user.id,
    watchStatus: "watched",
    release_date: response.data.aired.from,
    apiID: response.data.mal_id,
    unique_id: `${req.user.id}-${response.data.mal_id}`
  };
  await animeReview.upsert(result)
  res.redirect("/dashboard");
});

module.exports = router;
