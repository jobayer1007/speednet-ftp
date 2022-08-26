const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createNewSubMenu,
  getAllSubMenu,
  subMenuById,
  updateSubMenuById,
  deleteSubMenu,
} = require('../controllers/subMenuController');

router.route('/').post(protect, createNewSubMenu).get(getAllSubMenu);

router
  .route('/:id')
  .get(subMenuById)
  .put(protect, updateSubMenuById)
  .delete(protect, deleteSubMenu);

module.exports = router;
