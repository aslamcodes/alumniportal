import { useState } from "react";
import Pagination from "./Pagination";

export default {
  title: "Admin Page/Pagination",
  component: Pagination,
};

const Default = (args) => {
  return <Pagination {...args} />;
};

export const WithState = Default.bind({});
WithState.args = {
  currentPage: 1,
  onChange: (value) => {
    console.log(value);
  },
};
