import React, { useState } from "react";
import TreeNode from "./tree-node";
import styles from "./checkbox-tree.module.css";

const CheckboxTree = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const { list, pathLine, parentList } = styles;

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
      <ul className={`${list} ${parentList}`}>
        <span className={pathLine} />
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
