import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import languageReducer from './languageSlice';
import chartReducer from './chartSlice';
import sidebarReducer from './sidebarSlice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    auth: authReducer,
    language: languageReducer,
    chart : chartReducer,
    sidebarStatus: sidebarReducer,
  }
});