import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userLoginReducer } from './reducers/userReducers';
import {
  menuAllReducer,
  menuByIdReducer,
  menuDeleteReducer,
  menuNewReducer,
  menuUpdateReducer,
} from './reducers/mainMenuReducers';
import {
  movieAllReducer,
  movieByIdReducer,
  movieDeleteReducer,
  movieNewReducer,
  movieUpdateReducer,
} from './reducers/movieReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,

  // Main Menu
  menuNew: menuNewReducer,
  menuAll: menuAllReducer,
  menuById: menuByIdReducer,
  menuUpdate: menuUpdateReducer,
  menuDelete: menuDeleteReducer,

  // Movie
  movieNew: movieNewReducer,
  movieAll: movieAllReducer,
  movieById: movieByIdReducer,
  movieUpdate: movieUpdateReducer,
  movieDelete: movieDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const store = configureStore({ reducer, preloadedState: initialState });

export default store;
