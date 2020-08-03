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

//Passes bcrypt validation comparison into user object
User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
//Passes bcrypt hash/encryption of password
User.addHook("beforeCreate", (user) => {
  user.password = bcrypt.hashSync(user.password, salt, null);
});

//Code to ensure that any changes to the local db will sync to Heroku without deletion
User.sync({ alter: true });

module.exports = User;
