import { TextLink } from "../other/TextLink/TextLink.js";
import { ContentList } from "../Containers/ContentList/ContentList";

import { LikeButton } from "../other/LikeButton/LikeButton";
import { ContentBlock } from "../other/ContentBlock/ContentBlock";

import "./contentPreview.css";
import { DataEntry } from "../../types/SpotifyAPI/DataEntry";
import { SpotifyDataType } from "../../types/SpotifyAPI/DataType.js";

export const ContentPreview = ({ data }: { data: DataEntry }) => {
  return (
    <section className="contentPreview">
      <img
        className={
          data.type === SpotifyDataType.ARTIST ? "circular" : undefined
        }
        src={
          data.image
            ? data.image
            : "/assets/images/defaultImages/artist__default.png"
        }
        alt=""
      />
      <div className="description">
        <div className="description__TopRow">
          <ContentList>
            <h1 style={{ fontSize: "3.5rem", marginRight: "0.5rem" }}>
              {data.name}
            </h1>
            <LikeButton
              entryID={data.id}
              amountOfLikes={
                data.type === SpotifyDataType.ARTIST
                  ? data.followers
                  : undefined
              }
            />
          </ContentList>
          {data.type === SpotifyDataType.TRACK && (
            <ContentList>
              {data.artist.map((artist) => (
                <TextLink
                  key={artist.id}
                  link={`/preview/${artist.id}?contentType=${artist.type}`}
                >
                  <p style={{ fontSize: "1.25rem" }}>{artist.name}</p>
                </TextLink>
              ))}
            </ContentList>
          )}
        </div>
        {data.type === SpotifyDataType.ARTIST && data.genres.length > 0 && (
          <ContentList title="Genres:">
            {data.genres.map((genre) => {
              return (
                <ContentBlock key={genre}>
                  <img
                    src="../../assets/icons/pop.png"
                    alt="Heart icon to add artist to liked artists list"
                    className="icon"
                  />
                  <p>{genre}</p>
                </ContentBlock>
              );
            })}
          </ContentList>
        )}
      </div>
    </section>
  );
};
