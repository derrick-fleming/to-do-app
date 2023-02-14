import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk('todos/getTodos', async () => {
  const response = await fetch('/api/todos');
  if (response.ok) {
    const todos = await response.json();
    return { todos };
  }
})

interface Item {
  todoId: number
  task: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Item[],
  reducers: {
    addTodo: (state, action: PayloadAction<Item>) => {
      state.push(action.payload);
    },
    toggleComplete: (state, action: PayloadAction<Item>) => {
      const index = state.findIndex(todo => todo.todoId === action.payload.todoId)
      state[index].isCompleted = action.payload.isCompleted;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter(todo => todo.todoId !== action.payload);
    },
    sortTodo: (state, action: PayloadAction<string>) => {
      state.reverse();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      return action.payload.todos;
    })
  }
})

export const { addTodo, toggleComplete, deleteTodo, sortTodo } = todosSlice.actions;

export default todosSlice.reducer;
