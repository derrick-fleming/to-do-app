import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk('todos/getTodos', async () => {
  const response = await fetch('/api/todos');
  if (response.ok) {
    const todos = await response.json();
    console.log('todosThunk', todos);
    return { todos };
  }
})

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    add: (state, action) => {
      [...state, action.payload];
    },
    getList: (state, action) => {
      [action.payload]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      return action.payload.todos;
    })
  }
})

export const { add } = todosSlice.actions;

export default todosSlice.reducer;
