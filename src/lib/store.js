import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const defaultTask = [
  { id: "1", title: "Something 1", state: "TASK_INBOX" },
  { id: "2", title: "Something 2", state: "TASK_INBOX" },
  { id: "3", title: "Something 3", state: "TASK_INBOX" },
  { id: "4", title: "Something 4", state: "TASK_INBOX" },
];

const initialTaskBoxData = {
  tasks: defaultTask,
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "todos/fetchTasks",
  async (_, thunkApi) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?userId=1"
    );
    console.log(response.status);
    if (!response.ok) {
      return thunkApi.rejectWithValue("Error fetching data");
    }
    const data = await response.json();

    const result = data.map((task) => ({
      id: `${task.id}`,
      title: task.title,
      state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
    }));

    return result;
  }
);

export const tasksSlice = createSlice({
  name: "taskbox",
  initialState: initialTaskBoxData,
  reducers: {
    updateTaskState: (taskBoxData, action) => {
      const { id, newTaskState } = action.payload;
      const task = taskBoxData.tasks.findIndex((task) => task.id === id);
      if (task !== -1) {
        taskBoxData.tasks[task].state = newTaskState;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateTaskState } = tasksSlice.actions;

const store = configureStore({
  reducer: {
    taskbox: tasksSlice.reducer,
  },
});

export default store;
