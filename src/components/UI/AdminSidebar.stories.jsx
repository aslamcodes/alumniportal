import AdminSidebar from "./AdminSidebar";

export default {
  title: "AdminSidebar",
  component: AdminSidebar,
};

const Sidebar = (args) => <AdminSidebar {...args} />;

export const Expanded = Sidebar.bind({});
Expanded.args = {
  expanded: true,
  onClose: () => {},
};

export const Collapsed = Sidebar.bind({});
Collapsed.args = {
  expanded: false,
  onClose: () => {},
};
