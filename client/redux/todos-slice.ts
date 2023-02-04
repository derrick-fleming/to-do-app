import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: []
  },
  reducers: {
    add: (state, action) => {
      [...state.todos, action.payload];
    },
    getLists: (state, action) => {
      [...state.todos, action.payload];
    }
  }
})

export const { add, getLists } = todosSlice.actions;

export default todosSlice.reducer;
