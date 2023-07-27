import { createSlice } from "@reduxjs/toolkit";
import { buildSlice } from "../../utils";

const initialState = {
  videos: {},
  isLoading: false,
  error: "",
  keys: [],
  countKeys: 0
}

const deleteVideo = (obj, id) => {
  const { [id]: foo, ...rest } = obj;
  return rest;
}

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    actionFetchVideosLoading(state, action) {
      state.isLoading = action.payload;
    },
    actionFetchVideosSuccess(state, action) {
      state.error = "";
      state.videos = { ...(state.videos || {}), ...buildSlice(action.payload) };
      state.keys = Object.keys(state.videos).map((key) => key);
      state.countKeys = state.keys.length;
    },
    actionFetchVideosError(state, action) {
      state.error = action.payload;
    },
    actionFetchRemoveVideo(state, action) {
      state.error = "";
      state.videos = deleteVideo(state.videos, action.payload);
      state.keys = Object.keys(state.videos).map((key) => key);
      state.countKeys = state.keys.length;
    },
    actionResetVideos() {
      return { ...initialState };
    }
  }
})

export const {
  actionFetchVideosLoading,
  actionFetchVideosSuccess,
  actionFetchVideosError,
  actionFetchRemoveVideo,
  actionResetVideos,
} = videosSlice.actions;

export default videosSlice.reducer;
