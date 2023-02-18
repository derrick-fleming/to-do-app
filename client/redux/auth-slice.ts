import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type User = {
  userId: number,
  username: string
}

export const userSlice = createSlice({
  name: 'userAccount',
  initialState: {
    userId: null,
    username: null
  },
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId
    }
  }
})

export default userSlice.reducer;

export const { addUser } = userSlice.actions;
