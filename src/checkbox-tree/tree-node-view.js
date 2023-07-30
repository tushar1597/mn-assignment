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
  updateResponse,
  isIndeterminate,
  updateParent,
}) => {
  const {
    list,
    expandBtnWrapper,
    expandTrue,
    expandFalse,
    pathLine,
    itemPathLine,
    checkboxLineWrapper,
    hidder,
  } = styles;

  return (
    <>
      <span className={checkboxLineWrapper}>
        {node?.children?.length > 0 ? (
          <span className={expandBtnWrapper}>
            <ExpandButton isExpanded={isExpanded} onClick={handleExpand} />
          </span>
        ) : null}

        <span className={itemPathLine} />
        {node?.children && node?.children?.length > 0 ? null : (
          <span className={hidder} />
        )}
        <Checkbox
          label={`${node?.name} ${node?.id}`}
          isIndeterminate={isIndeterminate}
          onChange={handleCheck}
          isChecked={isChecked}
          id={node.id}
          reference={currentNodeRef}
        />
      </span>
      {node?.children && node?.children?.length > 0 && (
        <ul className={`${list} ${isExpanded ? expandTrue : expandFalse}`}>
          {node?.children?.map((child) => (
            <li key={child.id}>
              {child.children && child.children.length > 0 ? (
                <>
                  <span className={hidder} />
                  <span className={pathLine} />
                </>
              ) : null}
              <TreeNode
                node={child}
                updateResponse={updateResponse}
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
