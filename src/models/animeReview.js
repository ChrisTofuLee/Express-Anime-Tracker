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
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    watchStatus: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    release_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
};

const animeReview = sequelize.define("animeReview", schema);
animeReview.sync();

module.exports = animeReview;
