import React from 'react';

import "./header.css"

export default function Header() {
    return (
        <>
        <div className="searchBar">
            <input type="search" className="searchBar" />
        </div>
        <a className="profileIcon" href="./pages/profile/profilePage.html">
            <img
                src="./assets/icons/user.png"
                alt="An icon of a person's profile view"
            />
        </a>
        <a href="./index.html" style={{'all': 'unset', 'cursor': 'pointer'}}>
            <p className="userProfile">Home page</p>
        </a>
        </>
    );
}
