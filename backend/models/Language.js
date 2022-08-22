const { Sequelize } = require('sequelize');

//Language schema

const Language = (sequelize, DataTypes) =>
  sequelize.define('language', {
    iso_639_1: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      notEmpty: true,
      primaryKey: true,
    },

    english_name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
  });

module.exports = Language;
