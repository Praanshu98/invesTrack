import PropTypes from "prop-types";
const CustomButton = ({ customValue, customType, className, ...props }) => {
  return (
    <button
      type={customType || "submit"}
      className={`m-2 p-2 bg-blue-500 rounded border-2 border-blue-500 focus:border-2 focus:border-red-500 focus:outline-none focus:ring-0 ${className}`}
      {...props}
    >
      {customValue}
    </button>
  );
};

CustomButton.propTypes = {
  customValue: PropTypes.string,
  customType: PropTypes.string,
};

export default CustomButton;
