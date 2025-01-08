import "./screenOverlay.css"

export const ScreenOverlay = ({children, typeOfMessage = "DEFAULT"}) => {
    return(
        <div className="screenOverlay">
            <img src="assets/icons/note.png" alt="" />
            <h1>Message Title</h1>
            <p>Message description</p>
        </div>
    );
}