import React, { useEffect, useState, useRef } from "react";
import CheckboxTree from "./checkbox-tree";
import Checkbox from "./components/checkbox";

const STATES = {
  UNCHECKED: 1,
  INDETERMIATE: 2,
  CHECKED: 3,
};

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
  const [isExpanded, setIsExpanded] = useState(false);

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
      // isChecked,
      boxState,
      // childCheckedCount: getChildCheckedCount(),
      childCheckCount,
      childIndeterminateCount,
      currentElem: clickedCheckBoxIdRef.current,
    });
  };

  return (
    <div>
      {node.children.length > 0 ? (
        <button onClick={handleExpand}>{isExpanded ? "-" : "+"}</button>
      ) : null}
      <input
        type="checkbox"
        checked={boxState === STATES.CHECKED}
        onChange={handleCheck}
        id={node.id}
        ref={currentNodeRef}
      />
      <label for={node.id}>{node.name}</label>
      {/* <button onClick={getDetails}>get</button> */}
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <li key={child.id}>
              <TreeNode
                node={child}
                getDetails={getDetails}
                onCheck={onCheck}
                updateParent={handleChildCheck}
                forceUpdate={forceUpdateChildren}
                forceValue={
                  boxState === STATES.CHECKED
                    ? STATES.CHECKED
                    : STATES.UNCHECKED
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CheckboxTree2 = ({ data }) => {
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

const Demo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e, e.target[0].value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for="c1">Coding</label>
        <input type="checkbox" id="c1" checked />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

function App() {
  const data = [
    { id: "0-2", parentId: null, name: "Rugby", children: [] },
    {
      id: "0-0",
      parentId: null,
      name: "Sports",
      children: [
        {
          id: "0-0-0",
          parentId: "0-0",
          name: "IPL",
          children: [
            {
              id: "0-0-0-0",
              parentId: "0-0-0",
              name: "Mumbai Indians",
              defaultState: 3,
              children: [
                {
                  id: "0-0-0-0-0",
                  parentId: "0-0-0-0",
                  name: "Rohit Sharma",
                  // defaultState: 3,
                  children: [],
                },
                {
                  id: "0-0-0-0-1",
                  parentId: "0-0-0-0",
                  name: "hardik Pandaye",
                  // defaultState: 3,
                  children: [],
                },
                {
                  id: "0-0-0-0-2",
                  parentId: "0-0-0-0",
                  name: "Surya Kumar",
                  // defaultState: 3,
                  children: [],
                },
              ],
            },
            {
              id: "0-0-0-1",
              parentId: "0-0-0",
              name: "Rajasthan Royals",
              // defaultState: 3,
              children: [],
            },
            {
              id: "0-0-0-2",
              parentId: "0-0-0",
              name: "Gujarat Titans",
              defaultState: 3,
              children: [],
            },
          ],
        },
        {
          id: "0-0-1",
          parentId: "0-0",
          name: "EPL",
          children: [
            { id: "0-0-1-0", parentId: "0-0-1", name: "Arsenal", children: [] },
            { id: "0-0-1-1", parentId: "0-0-1", name: "Chelsea", children: [] },
            {
              id: "0-0-1-2",
              parentId: "0-0-1",
              name: "Manchester United",
              children: [],
            },
          ],
        },
        { id: "0-0-2", parentId: "0-0", name: "NBA", children: [] },
      ],
    },
    { id: "0-1", parentId: null, name: "Soccer", children: [] },
  ];

  console.log(data.length);

  return (
    <>
      <CheckboxTree data={data} />
      {/* <Checkbox label={"Hello"} /> */}
    </>
  );
  // return <Demo />;
}

export default App;
