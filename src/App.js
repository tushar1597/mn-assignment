import React from "react";
import CheckboxTree from "./checkbox-tree";

function App() {
  const data = [
    { id: "0-0-0", parentId: "0-0", name: "IPL" },
    {
      id: "0-0-0-0",
      parentId: "0-0-0",
      name: "Mumbai Indians",
    },
    { id: "0-0-1", parentId: "0-0", name: "EPL" },
    { id: "0-0-0-1", parentId: "0-0-0", name: "Rajasthan Royals" },
    { id: "0-0-1-0", parentId: "0-0-1", name: "Arsenal" },
    { id: "0-2", parentId: null, name: "Rugby" },
    { id: "0-0", parentId: null, name: "Sports" },
    { id: "0-0-1-1", parentId: "0-0-1", name: "Chelsea" },
    { id: "0-0-1-2", parentId: "0-0-1", name: "Manchester United" },
    { id: "0-0-0-2", parentId: "0-0-0", name: "Gujarat Titans" },
    { id: "0-0-2", parentId: "0-0", name: "NBA" },
    { id: "0-1", parentId: null, name: "Soccer" },
  ];

  const getCheckedMap = (map) => {
    console.log(map);
  };

  return (
    <>
      <CheckboxTree data={data} getCheckedMap={getCheckedMap} />
    </>
  );
}

export default App;
