import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: null,
  userEmail: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    isLogined(state, action) {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
    },
  },
});

export const { isLogined } = userSlice.actions;

export default userSlice.reducer;
