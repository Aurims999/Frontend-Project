import { ContentList } from "../Containers/ContentList/ContentList";

import { LikeButton } from "../other/LikeButton/LikeButton";
import { ContentBlock } from "../other/ContentBlock/ContentBlock";
import { Track } from "../../types/SpotifyAPI/Track";

import "./contentPreview.css";

export const ContentPreview = ({data} : {data : Track}) => {
  const songArtist = data.artist.length > 1 ? data.artist.reduce((artistsList, artist) => artistsList + artist.name + ", ", "").slice(0, -2) : data.artist[0].name;
  const genres = ["POP"];

  return (
    <section className="contentPreview">
      <img src={data.image ? data.image : "/assets/images/defaultImages/artist__default.png"} alt="" />
      <div className="description">
        <div className="description__TopRow">
          <ContentList>
            <h1 style={{ fontSize: "5rem", marginRight: "2rem" }}>
              {data.name}
            </h1>
            <LikeButton songId = {data.id} amountOfLikes={0}/>
          </ContentList>
          <p style={{ fontSize: "1.25rem" }}>{songArtist ? songArtist : ""}</p>
        </div>
        <ContentList title="Genres:">
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
        </ContentList>
      </div>
    </section>
  );
};
