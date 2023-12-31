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
  const { list, pathLine, parentList, submitBtn, errorMessage } = styles;
  const checkedItemsRef = useRef({});

  const updateResponse = (itemId, isChecked) => {
    checkedItemsRef.current[itemId] = isChecked;
  };

  const handleFetch = (e) => {
    e.preventDefault();
    let allItems = { ...checkedItemsRef.current };
    let checkedItems = {};
    Object.keys(allItems).forEach((key) => {
      if (allItems[key]) {
        checkedItems[key] = allItems[key];
      }
    });

    if (typeof getCheckedMap === "function") {
      getCheckedMap(checkedItems);
    }
  };

  if (data.length === 0) {
    return (
      <p className={errorMessage}>
        Either the data supplied is invalid or the data is not supplied. <br />
        Please validate the data!
      </p>
    );
  }

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
      {showSubmitBtn && data.length > 0 ? (
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
