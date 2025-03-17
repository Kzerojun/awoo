// src/components/Button.stories.tsx
import { Meta, Story } from "@storybook/nextjs";
import Button from "../common/Button";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
};

export default meta;

export const Default: Story<typeof Button> = (args) => <Button {...args} />;
Default.args = {
  text: "하이루",
  onClick: () => alert("Button clicked"),
  width: "60px",
};
