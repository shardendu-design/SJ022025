// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './slices/chartSlices';

const store = configureStore({
  reducer: {
    charts: chartReducer,
  },
});

// Export the store
export default store;

// Export RootState and AppDispatch types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;