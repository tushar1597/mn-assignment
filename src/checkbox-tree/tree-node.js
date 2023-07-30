import React, { useEffect, useState, useRef } from "react";
import { STATES } from "../utils/constants";
import TreeNodeView from "./tree-node-view";

const TreeNode = ({
  node,
  updateResponse,
  updateParent,
  forceUpdate,
  forceValue,
}) => {
  const [boxState, setBoxState] = useState(
    node.defaultState || STATES.UNCHECKED
  );
  const [forceUpdateChildren, setForceUpdateChildren] = useState(false);
  const childMapRef = useRef({});
  const clickedCheckBoxIdRef = useRef(null);
  const currentNodeRef = useRef(null);
  const [childCheckCount, setChildCheckCount] = useState(null);
  const [childIndeterminateCount, setChildIndeterminateCount] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    node.children.map(({ id, name, defaultState }) => {
      childMapRef.current[id] = defaultState || STATES.UNCHECKED;
    });

    setChildCheckCount(getChildCheckedCount() || null);

    return () => {
      clickedCheckBoxIdRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (
      node.children.length > 0 &&
      childCheckCount === node.children.length &&
      !forceUpdateChildren
    ) {
      updateChecks();
    } else if (
      ((boxState === STATES.CHECKED &&
        childCheckCount === node.children.length) ||
        (boxState === STATES.UNCHECKED && childCheckCount === 0)) &&
      forceUpdateChildren
    ) {
      setForceUpdateChildren(false);
    } else {
      if (
        childCheckCount !== null &&
        childCheckCount !== 0 &&
        childCheckCount !== node.children.length
      ) {
        updateChecks();
      }

      if (childCheckCount === 0 && boxState !== STATES.UNCHECKED) {
        updateChecks();
      }
    }
    return () => {
      clickedCheckBoxIdRef.current = null;
    };
  }, [childCheckCount]);

  useEffect(() => {
    if (childIndeterminateCount === null) {
      return;
    }

    updateChecks();
    return () => {
      clickedCheckBoxIdRef.current = null;
    };
  }, [childIndeterminateCount]);

  useEffect(() => {
    if (forceUpdate) {
      updateChecks();
    }
    return () => {
      clickedCheckBoxIdRef.current = null;
    };
  }, [forceUpdate]);

  useEffect(() => {
    if (
      (boxState === STATES.CHECKED &&
        node.children.length > 0 &&
        childCheckCount !== node.children.length) ||
      (boxState === STATES.UNCHECKED && childCheckCount > 0)
    ) {
      setForceUpdateChildren(true);
    }
    return () => {
      clickedCheckBoxIdRef.current = null;
    };
  }, [boxState]);

  const handleCheck = (e) => {
    clickedCheckBoxIdRef.current = e.target;
    updateChecks();
  };

  const updateChecks = () => {
    let value;

    if (clickedCheckBoxIdRef.current?.id === node.id) {
      value = boxState === STATES.CHECKED ? STATES.UNCHECKED : STATES.CHECKED;
    } else {
      value = forceUpdate
        ? forceValue
        : (childCheckCount > 0 && childCheckCount < node.children.length) ||
          childIndeterminateCount > 0
        ? STATES.INDETERMIATE
        : childCheckCount > 0 && childCheckCount === node.children.length
        ? STATES.CHECKED
        : STATES.UNCHECKED;
    }

    if (value === STATES.INDETERMIATE) {
      currentNodeRef.current.indeterminate = true;
    } else {
      currentNodeRef.current.indeterminate = false;
    }

    setBoxState(value);
    updateParent(node.id, value);
    updateResponse(
      node.id,
      value === STATES.CHECKED ? STATES.CHECKED : STATES.UNCHECKED
    );
  };

  const getChildCheckedCount = () => {
    const childCount = Object.keys(childMapRef.current).reduce((acc, key) => {
      if (childMapRef.current[key] === STATES.CHECKED) {
        acc += 1;
      }
      return acc;
    }, 0);
    return childCount;
  };

  const getChildIndeterminatedCount = () => {
    const childCount = Object.keys(childMapRef.current).reduce((acc, key) => {
      if (childMapRef.current[key] === STATES.INDETERMIATE) {
        acc += 1;
      }
      return acc;
    }, 0);
    return childCount;
  };

  // This function run as a parent w.r.t children
  const handleChildCheck = (id, value) => {
    childMapRef.current[id] = value;

    const childCheckedCount = getChildCheckedCount();
    const childIndeterminatedCount = getChildIndeterminatedCount();
    setChildCheckCount(childCheckedCount);
    setChildIndeterminateCount(childIndeterminatedCount);
  };

  const handleExpand = () => {
    console.log("Handle Expand called");
    setIsExpanded(!isExpanded);
  };

  return (
    <TreeNodeView
      node={node}
      isExpanded={isExpanded}
      handleExpand={handleExpand}
      isChecked={boxState === STATES.CHECKED}
      forceValue={
        boxState === STATES.CHECKED ? STATES.CHECKED : STATES.UNCHECKED
      }
      forceUpdate={forceUpdateChildren}
      updateResponse={updateResponse}
      isIndeterminate={boxState === STATES.INDETERMIATE}
      currentNodeRef={currentNodeRef}
      handleCheck={handleCheck}
      updateParent={handleChildCheck}
    />
  );
};

export default TreeNode;
