import { UPDATE_USER } from './actions.js';
import { SAVE_DATA } from './actions.js';

const initialState = {
  user: null,
};

const dataState = {
  data: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export { userReducer, dataReducer };
