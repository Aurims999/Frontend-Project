import { Link } from "react-router-dom";
import "./card.css";

export default function Card({ id, image, link, mainText, subText, altText }) {
  return (
    <div className="card">
      <Link to={`/preview/${id}?contentType=track`} className="card__link">
        <img src={image} alt={altText} />
        <h2>{mainText}</h2>
        <p>{subText}</p>
      </Link>
    </div>
  );
}
