import { configureStore } from "@reduxjs/toolkit";

import taskManagerReducer from "./redux/taskManagerSlice";
import userReducer from "./redux/userSlice";

export const store = configureStore({
  reducer: {
    taskManager: taskManagerReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
