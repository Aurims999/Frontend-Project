import { Link } from "react-router-dom";
import { ContentList } from "../Containers/ContentList/ContentList";

import { LikeButton } from "../other/LikeButton/LikeButton";
import { ContentBlock } from "../other/ContentBlock/ContentBlock";

import "./contentPreview.css";
import { DataEntry } from "../../types/SpotifyAPI/DataEntry";
import { spotify_dataTypes } from "./../../utils/commonConstants.js";

export const ContentPreview = ({data} : {data : DataEntry}) => {
  //const songArtist = data.artist.length > 1 ? data.artist.reduce((artistsList, artist) => artistsList + artist.name + ", ", "").slice(0, -2) : data.artist[0].name;

  console.log(data);
  return (
    <section className="contentPreview">
      <img src={data.image ? data.image : "/assets/images/defaultImages/artist__default.png"} alt="" />
      <div className="description">
        <div className="description__TopRow">
          <ContentList>
            <h1 style={{ fontSize: "5rem", marginRight: "2rem" }}>
              {data.name}
            </h1>
            {data.type === spotify_dataTypes.TRACK && <LikeButton songId = {data.id} amountOfLikes={0}/>}
          </ContentList>
          {data.type === spotify_dataTypes.TRACK &&
            <ContentList>
              {data.artist.map((artist) => (
                <Link key={artist.id} to={`/preview/${artist.id}?contentType=${artist.type}`}>
                  {artist.name}
                </Link>
              ))}
            </ContentList>
          }
        </div>
        {/* <ContentList title="Genres:">
          {genres.map(genre => {
            return (<ContentBlock key={genre}>
              <img
                src="../../assets/icons/pop.png"
                alt="Heart icon to add artist to liked artists list"
                className="icon"
              />
              <p>{genre}</p>
            </ContentBlock>);
          })}
        </ContentList> */}
      </div>
    </section>
  );
};
