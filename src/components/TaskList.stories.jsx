import TaskList from "./TaskList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "../lib/store";
import PropTypes from "prop-types";
import Task from "./Task";
import { mockedState } from "../lib/testState";

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [
    (Story) => (
      <div style={{ padding: "3rem" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

const MockStore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: tasksSlice.reducer,
      },
      preloadedState: { taskbox: taskboxState || mockedState },
    })}
  >
    {children}
  </Provider>
);

MockStore.propTypes = {
  taskboxState: PropTypes.shape({
    tasks: PropTypes.arrayOf(Task.propTypes.task),
    status: PropTypes.string,
    error: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};

export const Default = {
  decorators: [
    (Story) => (
      <MockStore taskboxState={mockedState}>
        <Story />
      </MockStore>
    ),
  ],
};

export const WithPinnedTasks = {
  decorators: [
    (Story) => {
      const pinnedTasks = [
        ...mockedState.tasks.slice(0, 5),
        { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
      ];
      return (
        <MockStore taskboxState={{ ...mockedState, tasks: pinnedTasks }}>
          <Story />
        </MockStore>
      );
    },
  ],
};

export const Loading = {
  decorators: [
    (Story) => (
      <MockStore taskboxState={{ ...mockedState, status: "loading" }}>
        <Story />
      </MockStore>
    ),
  ],
};

export const Empty = {
  decorators: [
    (Story) => (
      <MockStore taskboxState={{ ...mockedState, tasks: [] }}>
        <Story />
      </MockStore>
    ),
  ],
};
