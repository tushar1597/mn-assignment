import React, { useEffect, useState, useRef } from "react";
import { STATES } from "../utils/constants";
import TreeNodeView from "./tree-node-view";

const TreeNode = ({ node, onCheck, updateParent, forceUpdate, forceValue }) => {
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
      // console.log("D5");
      clickedCheckBoxIdRef.current = null;
    };
  }, []);

  useEffect(() => {
    console.log("UE::1", childCheckCount, node.name);
    if (
      node.children.length > 0 &&
      childCheckCount === node.children.length &&
      !forceUpdateChildren
    ) {
      console.log("B1", node.name);
      updateChecks("UP::1");
    } else if (
      ((boxState === STATES.CHECKED &&
        childCheckCount === node.children.length) ||
        (boxState === STATES.UNCHECKED && childCheckCount === 0)) &&
      forceUpdateChildren
    ) {
      console.log("B2", node.name);
      console.log("setting set-Force-Update-Children false", node.name);
      setForceUpdateChildren(false);
    } else {
      if (
        childCheckCount !== null &&
        childCheckCount !== 0 &&
        childCheckCount !== node.children.length
      ) {
        console.log("B3", node.name);
        updateChecks("UP::2");
        // currentNodeRef.current.indeterminate = true;
      }

      if (childCheckCount === 0 && boxState !== STATES.UNCHECKED) {
        console.log("B4", node.name);
        updateChecks("UP::3");
      }
    }
    return () => {
      console.log("D1");
      clickedCheckBoxIdRef.current = null;
    };
  }, [childCheckCount]);

  useEffect(() => {
    if (childIndeterminateCount === null) {
      return;
    }
    // if (childIndeterminateCount > 0) {
    console.log("childIndeterminateCount::", node.name);
    updateChecks("UP::4");
    // }
    return () => {
      console.log("D2");
      clickedCheckBoxIdRef.current = null;
    };
  }, [childIndeterminateCount]);

  useEffect(() => {
    if (forceUpdate) {
      console.log("FU::", node.id, node.name, forceValue);
      updateChecks("UP::5");
    }
    return () => {
      console.log("D3");
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
      console.log("Force Children update true", node.name);
      setForceUpdateChildren(true);
    }
    return () => {
      console.log("D4");
      clickedCheckBoxIdRef.current = null;
    };
  }, [boxState]);

  const handleCheck = (e) => {
    clickedCheckBoxIdRef.current = e.target;
    console.log(
      "Handle Check::>>",
      e.currentTarget,
      e.target,
      clickedCheckBoxIdRef.current
    );
    updateChecks("UP::6");
  };

  const updateChecks = (from) => {
    console.log(from);

    let value;

    if (clickedCheckBoxIdRef.current?.id === node.id) {
      // console.log(
      //   "Set-1",
      //   clickedCheckBoxIdRef.current,
      //   node.id,
      //   clickedCheckBoxIdRef.current
      // );
      value = boxState === STATES.CHECKED ? STATES.UNCHECKED : STATES.CHECKED;
    } else {
      // console.log("Set-2");
      value = forceUpdate
        ? forceValue
        : (childCheckCount > 0 && childCheckCount < node.children.length) ||
          childIndeterminateCount > 0
        ? STATES.INDETERMIATE
        : childCheckCount > 0 && childCheckCount === node.children.length
        ? STATES.CHECKED
        : STATES.UNCHECKED;
    }
    // value = isDefault ? node.defaultState : value;

    if (value === STATES.INDETERMIATE) {
      currentNodeRef.current.indeterminate = true;
    } else {
      currentNodeRef.current.indeterminate = false;
    }
    console.log("value:", value, node.name);
    console.log(
      node.name,
      childCheckCount > 0 && childCheckCount === node.children.length
    );

    setBoxState(value);
    // console.log("Updating parent:", node.id, value);
    updateParent(node.id, value);
    onCheck(
      node.id,
      boxState === STATES.UNCHECKED ? STATES.CHECKED : STATES.UNCHECKED
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

  const getDetails = () => {
    console.log({
      id: node.id,
      name: node.name,
      childMap: childMapRef.current,
      forceUpdate,
      forceUpdateChildren,
      forceValue,
      isChecked: boxState === STATES.CHECKED,
      boxState,
      // childCheckedCount: getChildCheckedCount(),
      childCheckCount,
      childIndeterminateCount,
      currentElem: clickedCheckBoxIdRef.current,
    });
  };

  return (
    // <div>
    //   {node.children.length > 0 ? (
    //     <button onClick={handleExpand}>{isExpanded ? "-" : "+"}</button>
    //   ) : null}
    //   <input
    //     type="checkbox"
    //     checked={boxState === STATES.CHECKED}
    //     onChange={handleCheck}
    //     id={node.id}
    //     ref={currentNodeRef}
    //   />
    //   <label for={node.id}>{node.name}</label>
    //   {/* <button onClick={getDetails}>get</button> */}
    //   {node.children && node.children.length > 0 && (
    //     <ul>
    //       {node.children.map((child) => (
    //         <li key={child.id}>
    //           <TreeNode
    //             node={child}
    //             onCheck={onCheck}
    //             updateParent={handleChildCheck}
    //             forceUpdate={forceUpdateChildren}
    //             forceValue={
    //               boxState === STATES.CHECKED
    //                 ? STATES.CHECKED
    //                 : STATES.UNCHECKED
    //             }
    //           />
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <TreeNodeView
      node={node}
      isExpanded={isExpanded}
      handleExpand={handleExpand}
      isChecked={boxState === STATES.CHECKED}
      forceValue={
        boxState === STATES.CHECKED ? STATES.CHECKED : STATES.UNCHECKED
      }
      forceUpdate={forceUpdateChildren}
      onCheck={onCheck}
      //   getDetails={getDetails}
      isIndeterminate={boxState === STATES.INDETERMIATE}
      currentNodeRef={currentNodeRef}
      handleCheck={handleCheck}
      updateParent={handleChildCheck}
    />
  );
};

export default TreeNode;
