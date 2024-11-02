import "./contentList.css";

export const ContentList = ({ children, title = "" }) => {
  return (
    <div className="contentList">
      <h2 className="contentList-title">{title}</h2>
      <div className="contentList-content">{children}</div>
    </div>
  );
};
