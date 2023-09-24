import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedInHabr: false,
  candidatesHabr: {},
  keysHabr: [],
  countKeysHabr: 0,
  isLoading: false,
  error: "",
};

const habrSlice = createSlice({
  name: "habr",
  initialState,
  reducers: {
    fetchHabrLoading(state, action) {
      state.isLoading = action.payload;
    },
    fetchLoggedInHabrSuccess(state, action) {
      state.error = "";
      state.isLoggedInHabr = true;
      state.authorizationCode = action.payload;
    },
    fetchHabrError(state, action) {
      state.error = action.payload;
    },
    fetchGetTokenInHabrSuccess(state, action) {
      state.error = "";
      state.isLoggedInHabr = true;
      state.tokenHabr = action.payload;
    },
    resetHabr() {
      return { ...initialState };
    }
  },
});

export const {
  fetchHabrLoading,
  fetchLoggedInHabrSuccess,
  fetchHabrError,
  fetchGetTokenInHabrSuccess,
  resetHabr,
} = habrSlice.actions;

export default habrSlice.reducer;
