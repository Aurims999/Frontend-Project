import "./contentGrid.css";

export const ContentGrid = ({ title = "", children, amountOfColumns = 5 }) => {
  return (
    <div className="containers-grid">
      <h2 className="gridTitle">{title}</h2>
      <div
        className="contentGrid"
        style={{ gridTemplateColumns: `repeat(${amountOfColumns}, 1fr)` }}
      >
        {children}
      </div>
    </div>
  );
};
