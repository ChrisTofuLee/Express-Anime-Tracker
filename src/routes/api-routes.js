const express = require("express");
const passport = require("../config/passport");
const User = require("../models/user");
const animeReview = require("../models/animeReview");

const router = express.Router();

router.get("/dashboard", (req, res) => {
  if (!req.user) {
    res.status(401);
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

router.post("/auth/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

router.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    const payload = {
      email,
      password,
      display_name: displayName,
    };

    await User.create(payload);

    res.redirect(302, "/login");
  } catch (err) {
    res.status(401).json(err);
  }
});




module.exports = router;
