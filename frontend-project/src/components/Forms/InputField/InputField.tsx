import "./inputField.css";

export const InputField = ({ type = "text", title = "", placeHolder = "" }) => {
  return (
    <div className="inputField">
      <label htmlFor={title}>{title}</label>
      <input id={title} type={type} placeholder={placeHolder} />
    </div>
  );
};
