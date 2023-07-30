import Checkbox from "../components/checkbox";
import ExpandButton from "../components/expand-button";
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
  const {
    list,
    nestedWrapper,
    baseWrapper,
    expandBtnWrapper,
    expandTrue,
    expandFalse,
    pathLine,
    itemPathLine,
    checkboxLineWrapper,
  } = styles;
  console.log(isChecked, node.name);
  return (
    <>
      {node.children.length > 0 ? (
        <span className={expandBtnWrapper}>
          <ExpandButton isExpanded={isExpanded} onClick={handleExpand} />
        </span>
      ) : // <button onClick={handleExpand}>{isExpanded ? "-" : "+"}</button>
      null}
      {/* <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheck}
        id={node.id}
        ref={currentNodeRef}
      />
      <label for={node.id}>{node.name}</label> */}
      <span className={checkboxLineWrapper}>
        {/* <span> */}
        <span className={itemPathLine} />
        <Checkbox
          label={node.name}
          isIndeterminate={isIndeterminate}
          onChange={handleCheck}
          // checked={isChecked}
          wrapperClasses={
            node.children && node.children.length > 0
              ? nestedWrapper
              : baseWrapper
          }
          isChecked={isChecked}
          id={node.id}
          reference={currentNodeRef}
        />
        {/* </span> */}
      </span>
      {/* <button onClick={getDetails}>get</button> */}
      {node.children && node.children.length > 0 && (
        <ul className={`${list} ${isExpanded ? expandTrue : expandFalse}`}>
          <span className={pathLine} />
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
    </>
  );
};

export default TreeNodeView;
