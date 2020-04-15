const filterNames = [
  `Everything`, `Future`, `Past`
];

export const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
    };
  });
};

