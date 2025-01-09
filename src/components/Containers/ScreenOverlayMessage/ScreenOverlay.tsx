import { useEffect } from "react";

import "./screenOverlay.css"

export const ScreenOverlay = ({children}) => {
    useEffect(() => {
        document.body.classList.add("scroll-disabled");

        return () => {
            document.body.classList.remove("scroll-disabled");
        }
    }, []);
    
    return(
        <div className="screenOverlay">
            {children}
        </div>
    );
}