import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todos-slice';
import userReducer from './auth-slice';

const store = configureStore({
  reducer: {
    todosList: todoReducer,
    user: userReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
