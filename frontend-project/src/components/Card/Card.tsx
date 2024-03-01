import React from "react";
import './card.css'

export default function Card({ image, link, mainText, subText, altText, }) {
  return (
    <div className="card">
      <a href={link} className="card__link">
        <img src={image} alt={altText}/>
        <h2>{mainText}</h2>
        <p>{subText}</p>
      </a>
    </div>
  );
}
