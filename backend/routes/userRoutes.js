const express = require('express');
const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
const {
  registerSystemAdmin,
  authUser,
  getUsers,
} = require('../controllers/userController');

// // USER
router.post('/login', authUser);

// // Get All User
router.route('/').get(getUsers);

// DEV Only: Register SystemAdmin////////////////////////////
router.route('/register/systemAdmin').post(registerSystemAdmin);

module.exports = router;
