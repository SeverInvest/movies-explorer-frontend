import { configureStore } from "@reduxjs/toolkit";
import videosSlice from "./slices/videosSlice";
import userSlice from "./slices/userSlice";
import { loadState } from "../utils/reduxToLocalStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    videos: videosSlice,
    user: userSlice,
  },
  preloadedState,
});