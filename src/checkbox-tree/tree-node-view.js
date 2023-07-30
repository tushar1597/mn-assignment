import Checkbox from "../components/checkbox";
import styles from "./checkbox-tree.module.css";
import TreeNode from "./tree-node";

const TreeNodeView = ({
  node,
  currentNodeRef,
  handleCheck,
  isExpanded,
  handleExpand,
  isChecked,
  forceValue,
  forceUpdate,
  onCheck,
  isIndeterminate,
  updateParent,
  //   getDetails,
}) => {
  console.log(isChecked, node.name);
  return (
    <div>
      {node.children.length > 0 ? (
        <button onClick={handleExpand}>{isExpanded ? "-" : "+"}</button>
      ) : null}
      {/* <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheck}
        id={node.id}
        ref={currentNodeRef}
      />
      <label for={node.id}>{node.name}</label> */}
      <Checkbox
        label={node.name}
        isIndeterminate={isIndeterminate}
        onChange={handleCheck}
        // checked={isChecked}
        isChecked={isChecked}
        id={node.id}
        reference={currentNodeRef}
      />
      {/* <button onClick={getDetails}>get</button> */}
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <li key={child.id}>
              <TreeNode
                node={child}
                onCheck={onCheck}
                updateParent={updateParent}
                forceUpdate={forceUpdate}
                forceValue={forceValue}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeNodeView;
