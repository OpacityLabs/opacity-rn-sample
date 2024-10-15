import { configureStore } from '@reduxjs/toolkit'
import connectionDataReducer from './state/reducer';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    connectionData: connectionDataReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;