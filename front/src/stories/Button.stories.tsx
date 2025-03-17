// src/stories/Button.stories.tsx
import { Meta, StoryFn } from "@storybook/react";
import Button from "../common/Button";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
};

export default meta;

export const Default: StoryFn<typeof Button> = (args) => <Button {...args} />;
Default.args = {
  text: "하이루",
  onClick: () => alert("Button clicked"),
  width: "long",
  backgroundColor: "main",
  fontColor: "black",
  disabled: false,
};
