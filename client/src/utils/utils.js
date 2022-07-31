export const getOptionsFor = (values) =>
  values.map(({ id, name }) => {
    return { value: id, label: name };
  });
