const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

const schema = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apiID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  review: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  unique_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  watchStatus: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  release_date: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
};

const animeReview = sequelize.define("animeReview", schema);
animeReview.sync({ alter: true });

module.exports = animeReview;
