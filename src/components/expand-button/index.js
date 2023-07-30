import styles from "./expand-button.module.css";

const ExpandButton = ({ isExpanded, onClick }) => {
  const { button, svg } = styles;
  return (
    <button className={button} type="button" onClick={onClick}>
      {!isExpanded ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={svg}
        >
          <path
            d="M5 1.25V8.75M1.25 5H8.75"
            stroke="#74838F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="2"
          viewBox="0 0 10 2"
          fill="none"
          className={svg}
        >
          <path
            d="M1.25 1L8.75 1"
            stroke="#74838F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default ExpandButton;
