import axios from 'axios';

import {
  MOVIE_ALL_FAIL,
  MOVIE_ALL_REQUEST,
  MOVIE_ALL_SUCCESS,
  MOVIE_BY_ID_FAIL,
  MOVIE_BY_ID_REQUEST,
  MOVIE_BY_ID_SUCCESS,
  MOVIE_DELETE_FAIL,
  MOVIE_DELETE_REQUEST,
  MOVIE_DELETE_SUCCESS,
  MOVIE_NEW_FAIL,
  MOVIE_NEW_REQUEST,
  MOVIE_NEW_SUCCESS,
  MOVIE_UPDATE_BY_ID_FAIL,
  MOVIE_UPDATE_BY_ID_REQUEST,
  MOVIE_UPDATE_BY_ID_SUCCESS,
} from '../constants/movieConstants';

export const newMovie = (newData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOVIE_NEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/movie', newData, config);

    dispatch({
      type: MOVIE_NEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOVIE_NEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allMovie = () => async (dispatch) => {
  try {
    dispatch({
      type: MOVIE_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/movie`, config);

    dispatch({
      type: MOVIE_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOVIE_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMovieById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOVIE_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/movie/${id}`, config);

    dispatch({
      type: MOVIE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOVIE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMovieById = (newData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOVIE_UPDATE_BY_ID_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/movie/${newData.id}`,
      newData,
      config
    );

    dispatch({
      type: MOVIE_UPDATE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOVIE_UPDATE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteMovie = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOVIE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/movie/${id}`, config);

    dispatch({ type: MOVIE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: MOVIE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
