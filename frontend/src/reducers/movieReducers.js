import {
  MOVIE_ALL_FAIL,
  MOVIE_ALL_REQUEST,
  MOVIE_ALL_SUCCESS,
  MOVIE_BY_ID_FAIL,
  MOVIE_BY_ID_REQUEST,
  MOVIE_BY_ID_RESET,
  MOVIE_BY_ID_SUCCESS,
  MOVIE_DELETE_FAIL,
  MOVIE_DELETE_REQUEST,
  MOVIE_DELETE_SUCCESS,
  MOVIE_NEW_FAIL,
  MOVIE_NEW_REQUEST,
  MOVIE_NEW_RESET,
  MOVIE_NEW_SUCCESS,
  MOVIE_UPDATE_BY_ID_FAIL,
  MOVIE_UPDATE_BY_ID_REQUEST,
  MOVIE_UPDATE_BY_ID_RESET,
  MOVIE_UPDATE_BY_ID_SUCCESS,
} from '../constants/movieConstants';

export const movieNewReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_NEW_REQUEST:
      return { loading: true };
    case MOVIE_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case MOVIE_NEW_FAIL:
      return { loading: false, error: action.payload };
    case MOVIE_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const movieAllReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MOVIE_ALL_REQUEST:
      return { loading: true };
    case MOVIE_ALL_SUCCESS:
      return {
        loading: false,
        movies: action.payload,
      };
    case MOVIE_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const movieByIdReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case MOVIE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case MOVIE_BY_ID_SUCCESS:
      return { loading: false, success: true, movie: action.payload };
    case MOVIE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case MOVIE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const movieUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case MOVIE_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, movie: action.payload };
    case MOVIE_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case MOVIE_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const movieDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_DELETE_REQUEST:
      return { loading: true };
    case MOVIE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MOVIE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
