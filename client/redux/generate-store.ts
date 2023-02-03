import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosSlice from './todos-slice';

const rootReducer = combineReducers({
  todosList: todosSlice
})

const store = configureStore({
  reducer: rootReducer
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
