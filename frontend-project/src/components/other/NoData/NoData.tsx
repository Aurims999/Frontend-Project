import { Link } from "react-router-dom";
import "./noData.css";

export const NoData = ({icon = "/assets/icons/note.png", message = ""}) => {
    return(
        <div className="noDataElement">
          <img src={icon} alt="No data found" />
          <h3>You do not have any favourite artists yet</h3>
          <Link to={"/"} className="defaultButton">Go and check out some of them!</Link>
        </div>
    );
}