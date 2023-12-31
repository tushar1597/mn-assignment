const sortFlatArray = (flatArray) => {
  flatArray.sort((a, b) => {
    return a.id > b.id ? 1 : -1;
  });
};

export function createNestedArray(flatArray) {
  let nestedArray = [];
  const itemMap = {};

  try {
    sortFlatArray(flatArray);

    // Creating a hash map of items based on their parentId
    flatArray.forEach((item) => {
      item.children = [];
      itemMap[item.id] = item;
      if (item.parentId === null) {
        nestedArray.push(item);
      }
    });

    // Assigning children to their respective parents
    flatArray.forEach((item) => {
      if (item.parentId !== null) {
        itemMap[item.parentId].children.push(item);
      }
    });
  } catch (err) {
    nestedArray = [];
  }
  return nestedArray;
}

export const noop = () => {};
