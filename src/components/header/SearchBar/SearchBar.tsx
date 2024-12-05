import "./SearchBar.css"
import { useState, useEffect } from "react";

function ResultRow({content, setSelection}){
    return <li onClick={(event) => {console.log(event.target.innerText)}}> {content} </li>;
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


export default function SearchBar({searchData, setResult}) {
    const [filteredData, setFilteredData] = useState(searchData);
    const [searchValue, setSearchValue] = useState("");
    const [userSelection, setUserSelection] = useState(null);

    useEffect(() => {
        setFilteredData(filterContent(searchData, searchValue));
    },[searchValue, searchData]);

    useEffect(() => {
        console.log(userSelection);
    }, [userSelection])

    return(
        <div className={`searchBar ${filteredData.length > 0 ? 'activeSearch' : ''}`}>
        <input className="searchBar"
        type="search"
        maxLength={50}
        onChange={(event) => {setSearchValue(event.target.value)}} />
        <ul>
            {filteredData.slice(0,5).map(entity => {
                return <ResultRow key={entity.id} content = {entity.name} setSelection={setUserSelection}/>
            })}
        </ul>
    </div>
    );
}
