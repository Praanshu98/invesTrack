import PropTypes from "prop-types";
const CustomButton = ({ customValue, customType, ...props }) => {
  return (
    <input
      type={customType || "button"}
      value={customValue || "Button"}
      className="m-2 p-2 bg-blue-500 text-white rounded border-2 border-blue-500 focus:border-2 focus:border-red-500 focus:outline-none focus:ring-0"
      {...props}
    />
  );
};

CustomButton.propTypes = {
  customValue: PropTypes.string,
  customType: PropTypes.string,
};

export default CustomButton;
