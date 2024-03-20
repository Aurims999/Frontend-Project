import Card from "../Card/Card";
import { TCard } from "../../App";

import "./contentBlock.css"

function BlockHeader({title, editable}) {
  return (
    <div className="header">
      <h1 className="headline">{title}</h1>
      {editable && (
        <div className="buttons">
          <p>View by:</p>
          <button>
            <img src="./assets/icons/menu-burger.png" alt="List layout" />
          </button>
          <button>
            <img src="./assets/icons/grid.png" alt="Grid layout" />
          </button>
        </div>
      )}
    </div>
  );
}

type ContentBlockProps = {
  content: TCard[],
  contentTitle: string,
  layout: boolean,
}

export default function ContentBlock({ content, contentTitle, layout }:ContentBlockProps) {
  return (
    <section className="contentBlock">
      <BlockHeader title={contentTitle} editable={layout} />
      <div className="grid">
        {content.map((entry) => {
          return (
            <Card
              key={entry.id}
              image={entry.image}
              link={entry.link}
              mainText={entry.name}
              subText={entry.genres}
              altText={`Image of ${entry.name}`}
            />
          );
        })}
      </div>
    </section>
  );
}
