import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: {},
  isLoading: false,
  error: "",
  keys: [],
  countKeys: 0,
  isImported: false
}

const buildSlice = (payload) => {
  let tempObj = {};
  if (!!payload && Array.isArray(payload) && payload.length > 0) {
    for (let item in payload) {
      tempObj = {
        ...tempObj, ...{ [payload[item]._id]: payload[item] }
      }
    };
      return tempObj;
  } else {
    return { [payload._id]: payload };
  };
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    actionFetchVideosLoading(state) {
      state.isLoading = true;
    },
    actionFetchVideosSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      state.videos = { ...(state.videos || {}), ...buildSlice(action.payload) };
      state.keys = Object.keys(state.videos).map((key) => key);
      state.countKeys = state.keys.length;
      state.isImported = true;
    },
    actionFetchVideosError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    actionSetVideoLike(state, action) {
      state.isLoading = false;
      state.videos = { ...(state.videos || {}), ...buildSlice(action.payload) };
    },
    actionSetVideoDisike(state, action) {
      state.isLoading = false;
      state.videos = { ...(state.videos || {}), ...buildSlice(action.payload) };
    },

  }
})

export const {
  actionFetchVideosLoading,
  actionFetchVideosSuccess,
  actionFetchVideosError,
  actionSetVideoLike
} = videosSlice.actions;

export default videosSlice.reducer;
