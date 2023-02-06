import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todos-slice';

const store = configureStore({
  reducer: {
    todosList: todoReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
