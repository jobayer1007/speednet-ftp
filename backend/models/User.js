const { Sequelize } = require('sequelize');

const User = (sequelize, DataTypes) =>
  sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        notEmpty: true,
      },
      userName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        notEmpty: true,
      },
      userRole: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        required: true,
        allowNull: false,
        notEmpty: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        required: true,
      },
      lastLogin: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  );

module.exports = User;
