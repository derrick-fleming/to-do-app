import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [
      { task: 'Laundry', isCompleted: false},
      { task: 'Go to store', isCompleted: false }
    ]
  },
  reducers: {
    add: (state, action) => {
      [...state.todos, action.payload];
    }
  }
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('/api/todos');
  return response }
);

export const { add } = todosSlice.actions;

export default todosSlice.reducer;
