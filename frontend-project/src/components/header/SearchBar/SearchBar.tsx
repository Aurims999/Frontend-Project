import "./SearchBar.css"
import { useState, useEffect } from "react";
import artists from "./../../../data/artists.json"

function ResultRow({content}){
    return <li> {content} </li>;
}

function filterContent(data, filter){
    if (filter == ""){
        return [];
    } else{
        return data.filter(entity => {
            return entity.name.toLowerCase().includes(filter.toLowerCase());
        });
    }
}

export default function Header() {
    const [data, setData] = useState(artists);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        setFilteredData(filterContent(data, searchValue));
        
    },[searchValue]);

    return(
        <div className={`searchBar ${filteredData.length > 0 ? 'activeSearch' : ''}`}>
        <input className="searchBar"
        type="search"
        maxLength={50}
        onChange={(event) => {setSearchValue(event.target.value)}} />
        <ul>
            {filteredData.slice(0,5).map(entity => {
                return <ResultRow content = {entity.name}/>
            })}
        </ul>
    </div>
    );
}
