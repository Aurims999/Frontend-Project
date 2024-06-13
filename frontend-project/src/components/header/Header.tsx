import "./header.css"
import SearchBar from "./SearchBar/SearchBar"
import ProfileIcon from "./ProfileIcon/ProfileIcon"

export default function Header({data, setSearchResult}) {
    return (
        <>
            <SearchBar
                searchData={data}
                setResult={setSearchResult}
            />
            <ProfileIcon userImage = "./assets/icons/user.png"/>
            <a href="./index.html" style={{'all': 'unset', 'cursor': 'pointer'}}>
                <p className="userProfile">Home page</p>
            </a>
        </>
    );
}
