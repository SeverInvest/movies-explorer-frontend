import { configureStore } from "@reduxjs/toolkit";
import videosSlice from "./slices/videosSlice";
import userSlice from "./slices/userSlice";
import popupSlice from "./slices/popupSlice";
import usersSlice from "./slices/usersSlice";
import { loadState } from "../utils";
import habrSlice from "./slices/habrSlice";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    videos: videosSlice,
    user: userSlice,
    popup: popupSlice,
    users: usersSlice,
    habr: habrSlice
  },
  preloadedState,
});