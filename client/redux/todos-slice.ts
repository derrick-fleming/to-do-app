import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk('todos/getTodos', async () => {
  const token = window.localStorage.getItem('todo-jwt')
  const request = {
    method: 'GET',
    headers: {
      'X-Access-Token': token
    }
  }
  const response = await fetch('/api/todos', request);
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
  name: 'todoApp',
  initialState: {
    todos: [] as Item[],
    sort: 'oldest',
    editItem: {} as Item
  },

  reducers: {
    addTodoStart: (state, action: PayloadAction<Item>) => {
      state.todos.unshift(action.payload);
    },
    addTodoEnd: (state, action: PayloadAction<Item>) => {
      state.todos.push(action.payload);
    },
    toggleComplete: (state, action: PayloadAction<Item>) => {
      const index = state.todos.findIndex(todo => todo.todoId === action.payload.todoId)
      state.todos[index].isCompleted = action.payload.isCompleted;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.todoId !== action.payload);
    },
    sortTodo: (state, action: PayloadAction<string>) => {
      if (action.payload === 'recent') {
        state.todos = state.todos.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      }
      if (action.payload === 'oldest') {
        state.todos = state.todos.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
      }
    },
    changeSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    editScreen: (state, action:PayloadAction<Item>) => {
      state.editItem = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      if (action.payload.todos) {
        state.todos = action.payload.todos;
      }
    })
  }
})

export const { addTodoEnd, addTodoStart, toggleComplete, deleteTodo, sortTodo, changeSort, editScreen } = todosSlice.actions;

export default todosSlice.reducer;
