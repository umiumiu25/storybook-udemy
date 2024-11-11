import { Provider } from "react-redux";
import InBoxScreen from "./InBoxScreen";
import store from "../lib/store";
import { http, HttpResponse } from "msw";
import { fireEvent, waitForElementToBeRemoved, within } from "@storybook/test";
import { mockedState } from "../lib/testState";

export default {
  component: InBoxScreen,
  title: "InBoxScreen",
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ["autodocs"],
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos?userId=1", () =>
          HttpResponse.json(mockedState.tasks)
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(await canvas.findByTestId("loading"));
    await fireEvent.click(canvas.getByLabelText("pinTask-1"));
    await fireEvent.click(canvas.getByLabelText("pinTask-3"));
    await fireEvent.click(canvas.getByLabelText("archiveTask-5"));
    // await waitFor(async () => {
    //   await fireEvent.click(canvas.getByLabelText("pinTask-1"));
    //   await fireEvent.click(canvas.getByLabelText("pinTask-3"));
    // });
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
          () =>
            new HttpResponse(
              { error: "Error fetching data" },
              {
                status: 400,
              }
            )
        ),
      ],
    },
  },
};
