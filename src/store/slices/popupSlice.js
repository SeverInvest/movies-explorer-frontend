import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisiblePopupForm: false,
  isVisiblePopupAlarm: false,
  messageAlarm: "",
}

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    actionVisiblePopupForm(state) {
      state.isVisiblePopupForm = true;
    },
    actionVisiblePopupAlarm(state, action) {
      state.isVisiblePopupAlarm = true;
      state.messageAlarm = action.payload;
    },
    actionCloseAllPopup(state) {
      state.isVisiblePopupForm = false;
      state.isVisiblePopupAlarm = false;
    },
    actionResetMessageAlarm(state) {
      state.messageAlarm = "";
    },
    actionResetPopup() {
      return { ...initialState };
    }
  }
})

export const {
  actionVisiblePopupForm,
  actionVisiblePopupAlarm,
  actionCloseAllPopup,
  actionResetMessageAlarm,
  actionResetPopup,
} = popupSlice.actions;

export default popupSlice.reducer;
