// reducers.js
const initialState = {
    // state awal aplikasi
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ACTION_TYPE':
        return { ...state, /* perubahan state */ };
      default:
        return state;
    }
  };
  
  export default reducer;