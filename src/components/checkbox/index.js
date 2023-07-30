import { forwardRef } from "react";
import styles from "./checkbox.module.css";
import PropTypes from "prop-types";
import { noop } from "../../utils/helpers";

const Checkbox = forwardRef(
  (
    { label, isIndeterminate, onChange, isChecked, id, wrapperClasses },
    ref
  ) => {
    const { checkboxWrapper, customCheckbox, active, text, indeterminate } =
      styles;

    return (
      <>
        <label htmlFor={id} className={`${checkboxWrapper} ${wrapperClasses}`}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            id={id}
            ref={ref}
          />
          <span
            className={`${customCheckbox} ${
              isIndeterminate ? indeterminate : isChecked ? active : ""
            }`}
          ></span>
          <span className={text}>{label}</span>
        </label>
      </>
    );
  }
);

Checkbox.propTypes = {
  label: PropTypes.string,
  isIndeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  id: PropTypes.string,
  wrapperClasses: PropTypes.string,
};

Checkbox.defaultProps = {
  label: "",
  isIndeterminate: false,
  onChange: noop,
  isChecked: false,
  id: "",
  wrapperClasses: "",
};

export default Checkbox;
