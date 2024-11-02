import { useState, useEffect } from "react";

import "./statItem.css";

export const StatItem = ({ icon = "pop.png", statNumber, statTitle }) => {
  const [statIcon, setIcon] = useState("pop.png");
  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setIcon(icon);
  }, [icon]);

  useEffect(() => {
    setNumber(number);
  }, [number]);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  return (
    <>
      <img
        src={`/assets/icons/${statIcon}`}
        alt={`Icon - ${statTitle}`}
        className="statItem__icon"
      />
      <p className="statItem__number">{statNumber}</p>
      <p className="statItem__title">{statTitle}</p>
    </>
  );
};
