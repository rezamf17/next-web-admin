// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers.js';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
