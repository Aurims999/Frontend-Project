import { Link } from "react-router-dom";

import { DataEntry } from "../../types/SpotifyAPI/DataEntry";

import "./card.css";
import { SpotifyDataType } from "../../types/SpotifyAPI/DataType";

export default function Card({ data } : { data: DataEntry }) {
  return (
    <div className={`card`}>
      <Link to={`/preview/${data.id}?contentType=${data.type}`} className="card__link">
        <img src={data.image} className={data.type === SpotifyDataType.ARTIST ? 'circular' : ''} alt={`Image of ${data.name}`} />
        <h2>{data.name}</h2>
        <p>{data.description}</p>
      </Link>
    </div>
  );
}
