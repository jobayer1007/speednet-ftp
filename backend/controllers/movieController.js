const asyncHandler = require('express-async-handler');
const { Genere, Country, Language, Cast } = require('../models/index');
const models = require('../models/index');

// @desc    Create a new movie     ///////////////////////////////////////////////
// @route   POST /api/movie
// @access  Private/SystemAdmin || Admin
exports.createNewMovie = asyncHandler(async (req, res) => {
  const {
    title,
    original_title,
    adult,
    poster_path,
    backdrop_path,
    tmdb_id,
    imdb_id,
    overview,
    release_date,
    original_language,
    tagline,
  } = req.body;
  const titleExists = await models.Movie.findOne({
    where: { title: title },
  });
  if (titleExists) {
    res.status(400);
    throw new Error('Movie already exists');
  } else {
    const newMovie = await models.Movie.create({
      title,
      original_title,
      adult,
      poster_path,
      backdrop_path,
      tmdb_id,
      imdb_id,
      overview,
      release_date,
      original_language,
      tagline,
    });
    if (newMovie) {
      res.json(newMovie);
    } else {
      res.status(400);
      throw new Error('Encountered problem while inserting new Movie');
    }
  }
});

// @desc    GET all movies     ///////////////////////////////////////////////
// @route   GET /api/movie
// @access  Public
exports.getAllMovies = asyncHandler(async (req, res) => {
  const movies = await models.Movie.findAll({
    include: [
      {
        model: Genere,
      },
      {
        model: Country,
      },
      {
        model: Language,
      },
      {
        model: Cast,
      },
    ],
  });
  if (movies && movies.length !== 0) {
    res.send(movies);
  } else {
    res.status(404);
    throw new Error('No movie');
  }
});

// @desc    Get a Movie by Id     ///////////////////////////////////////////////
// @route   GET /api/movie/:id
// @access  Public
exports.movieById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await models.Movie.findOne({
    where: { tmdb_id: id },
    include: [
      {
        model: Genere,
      },
      {
        model: Country,
      },
      {
        model: Language,
      },
      {
        model: Cast,
      },
    ],
  });

  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    throw new Error('movie not found');
  }
});

// @desc   Update a movie by Id      ///////////////////////////////////////////////
// @route   PUT /api/movie/:id
// @access  Private/Admin || SystemAdmin
exports.updateMovieById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await models.Movie.findOne({
    where: { movieId: id },
  });

  if (movie) {
    const data = {
      title: req.body.title || movie.title,
      original_title: req.body.original_title || movie.original_title,
      adult: req.body.adult || movie.adult,
      poster_path: req.body.poster_path || movie.poster_path,
      backdrop_path: req.body.backdrop_path || movie.backdrop_path,
      tmdb_id: req.body.tmdb_id || movie.tmdb_id,
      imdb_id: req.body.imdb_id || movie.imdb_id,
      overview: req.body.overview || movie.overview,
      release_date: req.body.release_date || movie.release_date,
      original_language: req.body.original_language || movie.original_language,
      tagline: req.body.tagline || movie.tagline,
    };

    let {
      title,
      original_title,
      adult,
      poster_path,
      backdrop_path,
      tmdb_id,
      imdb_id,
      overview,
      release_date,
      original_language,
      tagline,
    } = data;
    const updatedMovie = await models.Movie.update(
      {
        title,
        original_title,
        adult,
        poster_path,
        backdrop_path,
        tmdb_id,
        imdb_id,
        overview,
        release_date,
        original_language,
        tagline,
      },
      { where: { movieId: id } }
    );

    if (updatedMovie == 1) {
      res.send('movie update successful');
    } else {
      res.status(400);
      throw new Error('movie update unsuccessful');
    }
  } else {
    res.status(404);
    throw new Error('movie not found');
  }
});

// @desc    Delete a movie     ///////////////////////////////////////////////
// @route   DELETE /api/movie/:id
// @access  Private/Admin
exports.deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await models.Movie.findOne({
    where: { movieId: id },
  });

  if (movie) {
    models.Movie.destroy({
      where: { movieId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('movie has been deleted successfully');
        } else {
          res.status(400);
          throw new Error('Cannot delete the movie');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(404);
    throw new Error('movie not found');
  }
});
