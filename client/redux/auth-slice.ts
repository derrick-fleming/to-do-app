import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userAccount',
  initialState: {
    username: null
  },
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    }
  }
})

export default userSlice.reducer;
