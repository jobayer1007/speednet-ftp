const { Sequelize } = require('sequelize');

//Gender schema

const Gender = (sequelize, DataTypes) =>
  sequelize.define('gender', {
    genderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      notEmpty: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
  });

module.exports = Gender;
