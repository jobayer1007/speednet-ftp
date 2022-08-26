const { Sequelize } = require('sequelize');

const Menu = (sequelize, DataTypes) =>
  sequelize.define('menu', {
    menuId: {
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
    url: {
      type: DataTypes.STRING,
      defaultValue: '/',
      required: true,
      allowNull: false,
      notEmpty: true,
    },
  });

module.exports = Menu;
