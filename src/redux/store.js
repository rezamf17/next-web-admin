// store.js
import { configureStore } from '@reduxjs/toolkit';
import { userReducer, dataReducer } from './reducers.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
  },
});

export default store;
