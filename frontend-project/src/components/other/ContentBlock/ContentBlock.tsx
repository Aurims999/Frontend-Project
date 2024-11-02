import "./contentBlock.css";

export const ContentBlock = ({ children, backgroundColor }) => {
  return (
    <div className="textBlock" style={{ backgroundColor: backgroundColor }}>
      {children}
    </div>
  );
};
