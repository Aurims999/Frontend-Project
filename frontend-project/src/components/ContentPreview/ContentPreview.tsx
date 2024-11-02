import { ContentList } from "../Containers/ContentList/ContentList";

import { LikeButton } from "../other/LikeButton/LikeButton";
import { ContentBlock } from "../other/ContentBlock/ContentBlock";

import "./contentPreview.css";

export const ContentPreview = ({data = {}}) => {
  const {id, name, album, popularity, artists, type} = data;
  const image = album.images[0].url;
  const amountOfLikes = popularity;
  const songArtist = artists[0].name;
  const genres = [type];

  return (
    <section className="contentPreview">
      <img src={image ? image : "/assets/images/defaultImages/artist__default.png"} alt="" />
      <div className="description">
        <div className="description__TopRow">
          <ContentList>
            <h1 style={{ fontSize: "5rem", marginRight: "2rem" }}>
              {name}
            </h1>
            <LikeButton songId = {id} amountOfLikes={amountOfLikes}/>
          </ContentList>
          <p style={{ fontSize: "1.25rem" }}>{songArtist ? songArtist : ""}</p>
        </div>
        <ContentList title="Genres:">
          {genres.map(genre => {
            return (<ContentBlock>
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
