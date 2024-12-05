import "./iconBlock.css";

export const IconBlock = ({
  children,
  backgroundColor = "var(--headlineBlue)",
}) => {
  return (
    <div className="iconBlock" style={{ backgroundColor: backgroundColor }}>
      {children}
    </div>
  );
};
