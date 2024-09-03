import "./splitScreen.css";

export const SplitScreen = ({ children, title = "", leftSide = "1fr", rightSide = "1fr" }) => {
  return (
    <>
      <h1 className="splitScreen__title">{title}</h1>
      <div className="splitScreenContainer" style={{gridTemplateColumns : `${leftSide} ${rightSide}`}}>
        <section className="leftSide">{children[0]}</section>
        <section className="rightSide">{children[1]}</section>
      </div>
    </>
  );
};
