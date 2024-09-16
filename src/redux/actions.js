// actions/userActions.js
export const UPDATE_USER = 'UPDATE_USER';
export const SAVE_DATA = 'SAVE_DATA';

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const saveData = (data) => ({
  type: 'SAVE_DATA',
  payload: data,
})
