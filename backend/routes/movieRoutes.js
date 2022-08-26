const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createNewMovie,
  getAllMovies,
  movieById,
  updateMovieById,
  deleteMovie,
} = require('../controllers/movieController');

router.route('/').post(protect, createNewMovie).get(getAllMovies);

router
  .route('/:id')
  .get(movieById)
  .put(protect, updateMovieById)
  .delete(protect, deleteMovie);

module.exports = router;
