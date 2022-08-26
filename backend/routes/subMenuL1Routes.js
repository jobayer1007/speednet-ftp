const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createNewSubMenuL1,
  getAllSubMenu,
  subMenuById,
  updateSubMenuById,
  deleteSubMenu,
} = require('../controllers/subMenuL1Controller');

router.route('/').post(protect, createNewSubMenuL1).get(getAllSubMenu);

router
  .route('/:id')
  .get(subMenuById)
  .put(protect, updateSubMenuById)
  .delete(protect, deleteSubMenu);

module.exports = router;
