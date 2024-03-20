import "./header.css"
import SearchBar from "./SearchBar/SearchBar"
import ProfileIcon from "./ProfileIcon/ProfileIcon"

export default function Header() {
    return (
        <>
            <SearchBar/>
            <ProfileIcon userImage = "./assets/icons/user.png"/>
            <a href="./index.html" style={{'all': 'unset', 'cursor': 'pointer'}}>
                <p className="userProfile">Home page</p>
            </a>
        </>
    );
}
