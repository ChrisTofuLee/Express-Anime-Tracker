//middleware to make sure that user is logged user
const isAuthenticated = (req, res, next) => {
  if (req.user) return next();

  return res.redirect("/");
};

module.exports = isAuthenticated;
