import { forwardRef, useContext, useEffect } from "react";
import Checkbox from "../components/checkbox";
import ExpandButton from "../components/expand-button";
import styles from "./checkbox-tree.module.css";
import TreeNode from "./tree-node";
import CheckboxTreeContext from "../contexts/checkbox-tree-context";
import PropTypes from "prop-types";
import { noop } from "../utils/helpers";
import { STATES } from "../utils/constants";

const TreeNodeView = forwardRef(
  (
    {
      node,
      handleCheck,
      isExpanded,
      handleExpand,
      isChecked,
      forceValue,
      forceUpdate,
      updateResponse,
      isIndeterminate,
      updateParent,
    },
    ref
  ) => {
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
    const { activeColor } = useContext(CheckboxTreeContext);

    useEffect(() => {
      document.documentElement?.style?.setProperty(
        "--active-color",
        activeColor
      );
    }, [activeColor]);

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
            label={node?.name}
            isIndeterminate={isIndeterminate}
            onChange={handleCheck}
            isChecked={isChecked}
            id={node?.id}
            ref={ref}
          />
        </span>
        {node?.children && node?.children?.length > 0 && (
          <ul className={`${list} ${isExpanded ? expandTrue : expandFalse}`}>
            {node?.children?.map((child) => (
              <li key={child?.id}>
                {child?.children && child?.children?.length > 0 ? (
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
  }
);

TreeNodeView.propTypes = {
  node: PropTypes.object,
  handleCheck: PropTypes.func,
  isExpanded: PropTypes.bool,
  handleExpand: PropTypes.func,
  isChecked: PropTypes.bool,
  forceValue: PropTypes.number,
  forceUpdate: PropTypes.bool,
  updateResponse: PropTypes.func,
  isIndeterminate: PropTypes.bool,
  updateParent: PropTypes.func,
};

TreeNodeView.defaultProps = {
  node: {},
  handleCheck: noop,
  isExpanded: true,
  handleExpand: noop,
  isChecked: false,
  forceValue: STATES.UNCHECKED,
  forceUpdate: false,
  updateResponse: noop,
  isIndeterminate: false,
  updateParent: noop,
};

export default TreeNodeView;
