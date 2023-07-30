// import { useState } from "react";
import styles from "./checkbox.module.css";
// import { STATES } from "../../utils/constants";

const Checkbox = ({
  label,
  isIndeterminate,
  onChange,
  isChecked,
  id,
  reference,
}) => {
  const { checkboxWrapper, customCheckbox, active, text, indeterminate } =
    styles;

  console.log(isChecked, label);
  return (
    <span className={checkboxWrapper}>
      <label htmlFor={id}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          id={id}
          ref={reference}
        />
        <span
          className={`${customCheckbox} ${
            isIndeterminate ? indeterminate : isChecked ? active : ""
          }`}
        ></span>
        <span className={text}>{label}</span>
      </label>
      {/* <label htmlFor={id}>{label}</label> */}
    </span>
  );
};

export default Checkbox;
