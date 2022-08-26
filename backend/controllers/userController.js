const Sequelize = require('sequelize');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs'); // not installed yet

const models = require('../models/index');
const { generateToken, passwordResetToken } = require('../utils/generateToken');

///////////////////////////////////////////DEV ONLY////////////////////////////////////

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
// @desc    Register a SystemAdmin     ///////////////////////////////////////////////
// @route   POST /api/users/register/systemadmin
// @access  Public
exports.registerSystemAdmin = asyncHandler(async (req, res) => {
  const { email, password, userName, userRole } = req.body;

  const userExists = await models.User.findOne({
    where: { email: email },
  }); // Check if the Member already registered

  if (!userExists) {
    const t = await sequelize.transaction();
    try {
      // await member.addUser(
      await models.User.create(
        {
          email,
          password: bcrypt.hashSync(password, 10),
          userName,
          userRole,
        },
        { transaction: t }
      );

      await t.commit();
      res.status(201).json('SystemAdmin has been Created Successfully.');
    } catch (error) {
      await t.rollback();
      res
        .status(400)
        .send(
          'msg: Encountered a problem while creating SystemAdmin, error:' +
            error
        );
    }
  } else {
    res.status(400);
    throw new Error('User Already Exists');
  }
});

// @desc    Auth User & get Token     ///////////////////////////////////////////////
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await models.User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      res.status(400);
      throw new Error('Invalid Password!');
    } else {
      await models.User.update(
        {
          lastLogin: new Date(),
        },
        {
          where: {
            email: email,
          },
        }
      );
      res.json({
        userId: user.userId,
        email: user.email,
        userName: user.userName,
        userRole: user.userRole,
        lastLogin: new Date(),
        token: generateToken(user.userId, user.email),
      });
    }
  } else {
    res.status(404);
    throw new Error('Invalid User');
  }
});

// @desc    GET all Users
// @route   GET /api/users
// @access  Private/admin
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await models.User.findAll({
    attributes: { exclude: ['password'] },
    // include: [
    // { model: UserAddress, attributes: ['userAddressId'] },
    // { model: Order, attributes: ['orderId'] },
    // ],
  });
  if (users && users.length !== 0) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error('No User');
  }
});

// @desc    Get a  User by Id
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await models.User.findOne({
    where: { userId: req.params.id },
    // include: [{ model: UserAddress }, { model: Order }],
    attributes: { exclude: ['password'] },
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
