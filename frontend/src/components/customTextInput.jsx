const customTextInput = ({
  placeholderText,
  inputType,
  classNameText,
  ...props
}) => {
  return (
    <input
      type={inputType || "text"}
      placeholder={placeholderText || "placeholder text"}
      className={
        "m-2 rounded-lg p-2 placeholder-slate-500 border-2 bg-purssian-blue-800 border-purssian-blue-200  min-w-40 focus:border-red-500 focus:outline-none focus:ring-0 " +
        classNameText
      }
      {...props}
    />
  );
};

export default customTextInput;
