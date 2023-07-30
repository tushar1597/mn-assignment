import React, { useEffect, useState } from "react";
import TreeNode from "./tree-node";
import styles from "./checkbox-tree.module.css";
import { createNestedArray, noop } from "../utils/helpers";
import CheckboxTreeContext from "../contexts/checkbox-tree-context";
import PropTypes from "prop-types";

const CheckboxTree = ({ data, getCheckedMap }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const { list, pathLine, parentList } = styles;

  const updateResponse = (itemId, isChecked) => {
    let newItems = { ...checkedItems };
    if (checkedItems?.hasOwnProperty(itemId) && !isChecked) {
      delete newItems[itemId];
    } else if (isChecked) {
      newItems[itemId] = isChecked;
    }
    setCheckedItems({ ...newItems });
  };

  useEffect(() => {
    if (typeof getCheckedMap === "function") {
      getCheckedMap(checkedItems);
    }
  }, [checkedItems]);

  return (
    <div>
      <ul className={`${list} ${parentList}`}>
        {data.map((node) => (
          <li key={node.id}>
            <span className={pathLine} />
            <TreeNode node={node} updateResponse={updateResponse} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const dataMapper = (OriginalComponent) => {
  return function ({ data, activeColor, ...props }) {
    const nestedArray = createNestedArray(data);

    return (
      <>
        <CheckboxTreeContext.Provider value={{ activeColor }}>
          <OriginalComponent {...props} data={nestedArray} />
        </CheckboxTreeContext.Provider>
      </>
    );
  };
};

CheckboxTree.propTypes = {
  data: PropTypes.array,
  getCheckedMap: PropTypes.func,
};

CheckboxTree.defaultProps = {
  data: [],
  getCheckedMap: noop,
};

export default dataMapper(CheckboxTree);
