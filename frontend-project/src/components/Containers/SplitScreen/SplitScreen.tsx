import "./splitScreen.css";

export const SplitScreen = ({ children }) => {
  return (
    <div className="splitScreenContainer">
      <section className="leftSide">{children[0]}</section>
      <section className="rightSide">{children[1]}</section>
    </div>
  );
};
