import React, { useRef } from "react";
import TreeNode from "./tree-node";
import styles from "./checkbox-tree.module.css";
import { createNestedArray, noop } from "../utils/helpers";
import CheckboxTreeContext from "../contexts/checkbox-tree-context";
import PropTypes from "prop-types";

const CheckboxTree = ({
  data,
  getCheckedMap,
  submitBtnClasses,
  showSubmitBtn,
}) => {
  const { list, pathLine, parentList, submitBtn } = styles;
  const checkedItemsRef = useRef({});

  const updateResponse = (itemId, isChecked) => {
    let newItems = { ...checkedItemsRef.current };
    if (checkedItemsRef.current?.hasOwnProperty(itemId) && !isChecked) {
      delete newItems[itemId];
    } else if (isChecked) {
      newItems[itemId] = isChecked;
    }
    checkedItemsRef.current = { ...newItems };
  };

  const handleFetch = (e) => {
    e.preventDefault();
    if (typeof getCheckedMap === "function") {
      getCheckedMap({ ...(checkedItemsRef.current || {}) });
    }
  };

  return (
    <form>
      <ul className={`${list} ${parentList}`}>
        {data.map((node) => (
          <li key={node.id}>
            <span className={pathLine} />
            <TreeNode node={node} updateResponse={updateResponse} />
          </li>
        ))}
      </ul>
      {showSubmitBtn ? (
        <button
          onClick={handleFetch}
          className={`${submitBtnClasses || submitBtn}`}
        >
          Submit
        </button>
      ) : null}
    </form>
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
  submitBtnClasses: PropTypes.string,
  showSubmitBtn: PropTypes.bool,
};

CheckboxTree.defaultProps = {
  data: [],
  getCheckedMap: noop,
  submitBtnClasses: "",
  showSubmitBtn: false,
};

export default dataMapper(CheckboxTree);
