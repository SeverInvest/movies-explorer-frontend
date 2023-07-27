import { createSlice } from "@reduxjs/toolkit";
import { buildSlice } from "../../utils";

const initialState = {
  users: {},
  error: "",
  keys: [],
  countKeys: 0
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    actionFetchUsersSuccess(state, action) {
      state.error = "";
      state.users = { ...(state.users || {}), ...buildSlice(action.payload) };
      state.keys = Object.keys(state.users).map((key) => key);
      state.countKeys = state.keys.length;
    },
    actionFetchUsersError(state, action) {
      state.error = action.payload;
    },
    actionResetUsers() {
      return { ...initialState };
    }
  }
})

export const {
  actionFetchUsersSuccess,
  actionFetchUsersError,
  actionResetUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
