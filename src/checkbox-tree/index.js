import React, { useState } from "react";
import TreeNode from "./tree-node";

const CheckboxTree = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheck = (itemId, isChecked) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [itemId]: isChecked,
    }));
  };

  // console.log(checkedItems);

  return (
    <div>
      <h3>Checkbox Tree</h3>
      <ul>
        {data.map((node) => (
          <li key={node.id}>
            <TreeNode
              node={node}
              onCheck={handleCheck}
              updateParent={() => {}}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxTree;
