const CustomInput = ({ placeholderText, inputType, classNames, ...props }) => {
  return (
    <input
      type={inputType || "text"}
      placeholder={placeholderText || "placeholder text"}
      className={`m-2 min-w-28 rounded-lg border-2 border-purssian-blue-200 bg-purssian-blue-800 p-2 placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-0 ${classNames}`}
      {...props}
    />
  );
};

export default CustomInput;
