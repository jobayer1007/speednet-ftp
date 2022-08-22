const { Sequelize } = require('sequelize');

//Country schema

const Country = (sequelize, DataTypes) =>
  sequelize.define('country', {
    iso_3166_1: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      primaryKey: true,
      notEmpty: true,
    },

    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
  });

module.exports = Country;
