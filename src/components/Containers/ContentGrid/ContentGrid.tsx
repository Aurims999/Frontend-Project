import { NoData } from "../../other/NoData/NoData";
import "./contentGrid.css";

export const ContentGrid = ({ title = "", children, amountOfColumns = 5 }) => {
  return (
    <section className="containers-grid">
      <h2 className="gridTitle">{title}</h2>
      {children.length > 0 ? (
         <div
         className="contentGrid"
         style={{ gridTemplateColumns: `repeat(${amountOfColumns}, 1fr)` }}
         >
         {children}
       </div>
      ) : (
        <NoData/>
      )}

    </section>
  );
};
