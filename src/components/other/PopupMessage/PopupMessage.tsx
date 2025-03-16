import { useState, useEffect } from "react";
import "./popupMessage.css";

export const PopupMessage = ({ message = "", display = false }) => {
  const [isFading, setFading] = useState(false);
  const [visible, setVisibility] = useState(display);

  useEffect(() => {
    if (display) {
      setVisibility(true);
      setFading(false);
    } else if (visible) {
      setFading(true);
      setTimeout(() => {
        setVisibility(false);
      }, 1000);
    }
  }, [display]);

  if (!visible) return null;

  return (
    <div className={`popupMessage ${isFading ? "popup-fadeOut" : ""}`}>
      <img src="/assets/icons/warning.png" alt="Warning Icon" />
      <p>{message}</p>
    </div>
  );
};
