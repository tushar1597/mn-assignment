import styles from "./checkbox.module.css";

const Checkbox = ({
  label,
  isIndeterminate,
  onChange,
  isChecked,
  id,
  reference,
  wrapperClasses,
}) => {
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
          ref={reference}
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
};

export default Checkbox;
