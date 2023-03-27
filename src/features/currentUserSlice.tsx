import { createSlice } from "@reduxjs/toolkit";
import { CurrentUserInitialState } from "@interface/CurrentUserInitialState";
import { User } from "firebase/auth";
import { type PayloadAction } from "@reduxjs/toolkit";

const initialState: CurrentUserInitialState = {
  currentUser: null,
};

export const currentUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setLogout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, setLogout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
