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

router.post("/search", async (req, res) => {
  const { animeName } = req.body
  //res.json(animeName)
  try {
    const response = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${animeName}`);
    res.json(response.data)
   // res.end()
  } catch (error) {
    console.error(error.message);
    //recode to anime error
    res.end()
  }
 })
module.exports = router;
