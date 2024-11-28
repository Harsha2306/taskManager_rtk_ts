import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Task } from "../types/Type";

export type TaskManagerState = {
  tasks: Task[];
};

type UserTasks = {
  loggedInUser: string | null;
} & TaskManagerState;

const initialState: TaskManagerState = {
  tasks: [],
};

export const taskManagerSlice = createSlice({
  name: "taskManager",
  initialState,
  reducers: {
    initialiseUserTasks: (state) => {
      const localTasks = localStorage.getItem("localTasks");
      if (localTasks) {
        const userTasks: UserTasks = JSON.parse(localTasks).find(
          (localTask: UserTasks) =>
            localTask.loggedInUser === localStorage.getItem("loggedInUser")
        );
        if (userTasks) state.tasks = userTasks.tasks;
        else state.tasks = [];
      }
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      const localTasks = localStorage.getItem("localTasks");
      if (localTasks) {
        const parsedLocalTasks: UserTasks[] = JSON.parse(localTasks);
        const userTasks = parsedLocalTasks.find(
          (user: UserTasks) =>
            user.loggedInUser === localStorage.getItem("loggedInUser")
        );
        if (!userTasks) {
          parsedLocalTasks.push({
            loggedInUser: localStorage.getItem("loggedInUser"),
            tasks: [action.payload],
          });
        } else userTasks.tasks.push(action.payload);
        localStorage.setItem("localTasks", JSON.stringify(parsedLocalTasks));
      } else {
        localStorage.setItem(
          "localTasks",
          JSON.stringify([
            {
              loggedInUser: localStorage.getItem("loggedInUser"),
              tasks: [action.payload],
            },
          ])
        );
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const taskindex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (taskindex !== -1) {
        state.tasks[taskindex] = {
          ...state.tasks[taskindex],
          ...action.payload,
        };
      }
      const localTasks = localStorage.getItem("localTasks");
      if (localTasks) {
        const parsedLocalTasks = JSON.parse(localTasks);
        const userTasks: UserTasks = parsedLocalTasks.find(
          (userTask: UserTasks) =>
            userTask.loggedInUser === localStorage.getItem("loggedInUser")
        );
        const currentTaskIdx = userTasks.tasks.findIndex(
          (curr) => curr.id === action.payload.id
        );
        userTasks.tasks[currentTaskIdx] = {
          ...userTasks.tasks[currentTaskIdx],
          ...action.payload,
        };
        localStorage.setItem("localTasks", JSON.stringify(parsedLocalTasks));
      }
    },
  },
});

export const { addTask, updateTask, initialiseUserTasks } =
  taskManagerSlice.actions;

export default taskManagerSlice.reducer;
