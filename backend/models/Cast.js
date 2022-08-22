const { Sequelize } = require('sequelize');

//Cast schema

const Cast = (sequelize, DataTypes) =>
  sequelize.define('cast', {
    CastId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      required: true,
      notEmpty: true,
      primaryKey: true,
    },

    original_name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    profile_path: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
  });

module.exports = Cast;
