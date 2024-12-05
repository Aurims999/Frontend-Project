import "./inputField.css";

export const InputField = ({
  type = "text",
  title = "",
  placeHolder = "",
  required = true,
  name = title,
  value,
  onChange,
}) => {
  return (
    <div className="inputField">
      <label htmlFor={title}>{title}</label>
      <input
        id={title}
        name={name}
        type={type}
        placeholder={placeHolder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
