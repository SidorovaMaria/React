import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const updatedUser = action.payload;
      state.user = {
        ...state.user, // Spread the current user state
        ...updatedUser, // Spread the updated data to overwrite the modified field(s)
      };
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setLoading, setError, logoutUser } = authSlice.actions;

export default authSlice.reducer;
