const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createNewMainMenu,
  getAllMenu,
  mainMenuById,
  updateMainMenuById,
  deleteMainMenu,
} = require('../controllers/menuController');

router.route('/').post(protect, createNewMainMenu).get(getAllMenu);

router
  .route('/:id')
  .get(mainMenuById)
  .put(protect, updateMainMenuById)
  .delete(protect, deleteMainMenu);

module.exports = router;
