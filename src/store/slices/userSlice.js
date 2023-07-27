import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  isLoading: false,
  error: "",
  userId: "",
  userName: "",
  userEmail: "",
  isLoggedIn: false,
  userRoles: [],
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserLoading(state, action) {
      state.isLoading = action.payload;
    },
    fetchUserSuccess(state, action) {
      state.error = "";
      state.videos = action.payload.videos;
      state.userId = action.payload._id;
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      state.isLoggedIn = true;
      state.userRoles = action.payload.roles;
    },
    fetchUserError(state, action) {
      state.error = action.payload;
    },
    setUserVideo(state, action) {
      state.videos = action.payload.videos;
    },
    resetUser() {
      return { ...initialState };
    }
  }
})

export const {
  fetchUserLoading,
  fetchUserSuccess,
  fetchUserError,
  setUserVideo,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;