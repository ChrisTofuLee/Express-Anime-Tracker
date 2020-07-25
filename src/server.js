const express = require("express");
const session = require("express-session");
const expressHandlebars = require("express-handlebars");
const path = require("path");

const passport = require("./config/passport");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");

const PORT = process.env.PORT || 8080;

const app = express();

const sessionOptions = {
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true,
};

const hbOptions = {
  defaultLayout: "main",
  layoutsDir: "src/views/layouts",
  partialsDir: "src/views/partials",
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", expressHandlebars(hbOptions));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

const hb = expressHandlebars.create(hbOptions);

//handlebars helper function to identify if db value matches selected value
hb.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  
  if (arg1 === arg2) {
    console.log("check here", arg1, arg2, options.fn(this))
    return options.fn(this);
  }
});

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`Navigate to http://localhost:${PORT}`);
});
