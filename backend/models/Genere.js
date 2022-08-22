const { Sequelize } = require('sequelize');

//Genere schema

const Genere = (sequelize, DataTypes) =>
  sequelize.define('genere', {
    id: {
      type: DataTypes.BIGINT,
      required: true,
      allowNull: false,
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

module.exports = Genere;
