import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducer/authUser'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
