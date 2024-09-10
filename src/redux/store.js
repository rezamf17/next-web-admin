import { configureStore, createSlice } from '@reduxjs/toolkit';

// Data initial, berupa array of objects
const initialData = [];

// Slice untuk mengelola data
const dataSlice = createSlice({
  name: 'data',
  initialState: initialData,
  reducers: {
    addItem: (state, action) => {
      const { name, record } = action.payload;
      // Buat salinan state dengan properti baru jika belum ada
      return {
        ...state,
        [name]: state[name] ? [...state[name], record] : [record],
      };
    },
    updateItem: (state, action) => {
      const { id, newValue } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.value = newValue;
      }
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, removeItem } = dataSlice.actions;

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
