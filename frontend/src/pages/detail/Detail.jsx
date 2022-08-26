import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import LocalVideoPlayBox from './LocalVideoPlayBox';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById } from '../../actions/movieActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const Detail = () => {
  const dispatch = useDispatch();
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  const movieById = useSelector((state) => state.movieById);
  const { loading, error, movie } = movieById;

  useEffect(() => {
    dispatch(getMovieById(id));
  }, [dispatch, id]);

  console.log(movie);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        movie && (
          <>
            <div
              className='banner'
              style={{
                backgroundImage: `url(${apiConfig.originalImage(
                  movie.backdrop_path || movie.poster_path
                )})`,
              }}
            ></div>
            <div className='mb-3 movie-content container'>
              <div className='movie-content__poster'>
                <div
                  className='movie-content__poster__img'
                  style={{
                    backgroundImage: `url(${apiConfig.originalImage(
                      movie.poster_path || movie.backdrop_path
                    )})`,
                  }}
                ></div>
              </div>
              <div className='movie-content__info'>
                <h1 className='title'>{movie.title || movie.name}</h1>
                <div className='genres'>
                  {movie.generes &&
                    movie.generes.slice(0, 5).map((genre, i) => (
                      <span key={i} className='genres__item'>
                        {genre.name}
                      </span>
                    ))}
                </div>
                <p className='overview'>{movie.overview}</p>
                <div className='cast'>
                  <div className='section__header'>
                    <h2>Casts</h2>
                  </div>
                  <CastList id={movie.tmdb_id} />
                </div>
              </div>
            </div>
            <div className='container'>
              <div className='section mb-3'>
                {movie.file_path ? <LocalVideoPlayBox item={movie} /> : null}
              </div>
              <div className='section mb-3'>
                <div className='section__header mb-2'>
                  <h2>Similar</h2>
                </div>
                <MovieList
                  category={category}
                  type='similar'
                  id={movie.tmdb_id}
                />
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default Detail;
