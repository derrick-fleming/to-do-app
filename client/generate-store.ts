import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosSlice from './components/todos-slice';

const rootReducer = combineReducers({
  todos: todosSlice
})

const store = configureStore({
  reducer: rootReducer
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
