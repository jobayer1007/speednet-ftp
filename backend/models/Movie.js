const { Sequelize } = require('sequelize');

//Movie schema

const Movie = (sequelize, DataTypes) =>
  sequelize.define('movie', {
    movieId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    original_title: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    adult: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    poster_path: {
      type: DataTypes.STRING,
      // required: true,
      allowNull: false,
      notEmpty: true,
    },

    backdrop_path: {
      type: DataTypes.STRING,
      // required: true,
      allowNull: false,
      notEmpty: true,
    },

    tmdb_id: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    imdb_id: {
      type: DataTypes.STRING,
      // required: true,
      allowNull: false,
      notEmpty: true,
    },

    overview: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    release_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      required: true,
    },

    original_language: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    tagline: {
      type: DataTypes.STRING,
      // required: true,
      // allowNull: false,
      // notEmpty: true,
    },

    file_path: {
      type: DataTypes.STRING,
    },
  });

module.exports = Movie;
