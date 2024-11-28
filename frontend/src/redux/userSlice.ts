import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type User } from "../types/Type";

export type UserState = {
  users: User[];
  loggedInUser: string | null;
};

const initialState: UserState = {
  users: [],
  loggedInUser: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    initialiseUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    initialiseLoggedInUser: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        localStorage.setItem("loggedInUser", action.payload);
        state.loggedInUser = action.payload;
      }
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    logout: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { initialiseUsers, initialiseLoggedInUser, addUser, logout } =
  userSlice.actions;

export default userSlice.reducer;
