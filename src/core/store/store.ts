import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import recipesSlice from './recipesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
