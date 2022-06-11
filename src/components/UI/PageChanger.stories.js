import { useState } from "react";
import PageChanger from "./PageChanger";

export default {
  title: "Admin Page/PageChanger",
  component: PageChanger,
};

const Default = (args) => {
  return <PageChanger {...args} />;
};

export const WithState = Default.bind({});
WithState.args = {
  currentPage: 1,
  onChange: (value) => {
    console.log(value);
  },
};
