export const sortArray = property => {
  let sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return (a, b) => {
    const first = Number(a[property]);
    const second = Number(b[property]);
    if (sortOrder === -1) {
      return first > second ? -1 : first < second ? 1 : 0;
    } else {
      return first < second ? -1 : first > second ? 1 : 0;
    }
  };
};
