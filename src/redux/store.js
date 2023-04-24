import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import languageReducer from './languageSlice';
import chartReducer from './chartSlice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    auth: authReducer,
    language: languageReducer,
    chart : chartReducer
  }
});