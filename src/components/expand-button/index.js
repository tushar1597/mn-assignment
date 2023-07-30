import styles from "./expand-button.module.css";
import plusIcon from "../../assets/svg-icons/plus-icon.svg";
import minusIcon from "../../assets/svg-icons/minus-icon.svg";
import PropTypes from "prop-types";
import { noop } from "../../utils/helpers";

const ExpandButton = ({ isExpanded, onClick }) => {
  const { button, svg } = styles;
  return (
    <button className={button} type="button" onClick={onClick}>
      {!isExpanded ? (
        <img src={plusIcon} alt="plus" className={svg} />
      ) : (
        <img src={minusIcon} alt="minus" className={svg} />
      )}
    </button>
  );
};

ExpandButton.propTypes = {
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func,
};

ExpandButton.defaultProps = {
  isExpanded: true,
  onClick: noop,
};

export default ExpandButton;
