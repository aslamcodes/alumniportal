import Pagination_component from "./Pagination";

export default {
  title: "Admin Page/Pagination",
  component: Pagination_component,
};

export const Pagination = (args) => {
  return <Pagination_component {...args} />;
};
