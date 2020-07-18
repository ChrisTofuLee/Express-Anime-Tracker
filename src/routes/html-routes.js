const express = require("express");
const axios = require("axios");

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
router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { email: req.user.email });
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
// router.get("/titles/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const response = await axios.get(`https://api.jikan.moe/v3/anime/${id}`);
//     const result = {
//       title: "",
      
//     }
//     res.render("newtemplate", result);
//     // res.end()
//   } catch (error) {
//     console.error(error.message);
//     //recode to anime error
//     res.end();
//   }
// });
module.exports = router;
