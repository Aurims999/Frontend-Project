import React from "react";

import Card from "../Card/Card";

import "./contentBlock.css"

function BlockHeader({ title, editable }) {
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

export default function ContentBlock({ content, contentTitle, layout }) {
  return (
    <section className="contentBlock">
      <BlockHeader title={contentTitle} editable={layout} />
      <div className="grid">
        {content.map((card) => {
          return (
            <Card
              key={card.id}
              image={card.image}
              link={card.link}
              mainText={card.name}
              subText={card.genres}
              altText={`Image of ${card.name}`}
            />
          );
        })}
      </div>
    </section>
  );
}
