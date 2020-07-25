const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");

const sequelize = require("../config/connection.js");
const animeReview = require("./animeReview.js");

const salt = bcrypt.genSaltSync(10);

const schema = {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  display_name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
};

const User = sequelize.define("user", schema);

User.hasMany(animeReview, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.addHook("beforeCreate", (user) => {
  user.password = bcrypt.hashSync(user.password, salt, null);
});

//making sure that heroku alters any changes on the db but it will never delete anything
User.sync({ alter: true });

module.exports = User;
