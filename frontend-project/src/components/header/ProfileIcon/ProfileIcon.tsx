import "./ProfileIcon.css"

export default function ProfileIcon({userImage}){
    return(
        <a className="profileIcon" href="./pages/profile/profilePage.html">
            <img
                src= {userImage}
                alt="An icon of a person's profile view"
            />
        </a>
    );
}