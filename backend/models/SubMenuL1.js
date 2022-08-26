const { Sequelize } = require('sequelize');

const SubMenuL1 = (sequelize, DataTypes) =>
  sequelize.define('subMenuL1', {
    subMenuL1Id: {
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

module.exports = SubMenuL1;
