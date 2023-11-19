
# Favourite songs playlist

Favourite songs playlist app should have the capability to build personal playlists from popular songs/artists on Spotify.

<a href="https://aurims999.github.io/Frontend-Project/" target="_blank"> Current State of the Project </a>


## Home Page

The home page should have at least 3 categories to choose from:
 * Songs
 * Artists
 * Albums
 * Recommended for you (Optional)
## Display Navigation

 * Items in each category can be displayed in list view or grid view;
 * Each category should have a 'View all' link that navigates to a page with a full list of items
 * Each item should have a button to add to the playlist or favorite Artists/Albums
 * There should be a dropdown menu in the navigation bar (includes My profile, My Music, Logout)
 * When the user is logged out, the navigation menu should show a ‘Login’ button 
## View All Page

 * ‘View all’ page should display a list of items from one category from Songs/Artists/Albums
 * List can be displayed in list view or grid view
 * List should have an infinite scroll or pagination functionality. Don’t use any infinite scroll libraries. Hint: IntersectionObserver
 * Each item from the list can be added to a playlist or favorite Artists/Albums
## My Music Page

* My music page should display user-created playlists and favorited Artists/Albums. It should be possible to reach this page from the navigation menu.
 * There should be a button to create new playlist. Once a playlist is created (a pop-up that only asks to enter a playlist’s name and has a confirmation button), it should redirect you to the newly created playlist’s page
 * Each playlist should have an editable title
 * Below a playlist’s title there should be a list of songs (rows) with columns such as: 
    * number in the list
    * artist
    * album/collection
    * genre
 * User can navigate to each playlist and see the full list of songs. ‘View all’ page can be reused here
 * Each item (song, playlist, favorite Artist/Album) in the list can be removed
## Search

* User should be able to search for Songs/Artists/Albums
 * Search button should take to the search results page
 * Search results should display all categories Songs/Artists/Albums
 * If possible implement autocomplete or ‘search as you type’ functionality
## Profile Page 
* Auth0 authentication should be implemented.
 * When a ‘Login’ button is clicked, the user should be redirected to Auth0 page with a form to login using username/password or SSO service via Google
 * If user is not authenticated, then all attempts to reach playlists, user’s profile page or any other existing page (by adding a path in the URL), should lead to a page asking the user to login
 * Once the user logs in successfully, it should redirect to Home page
 * Instead of a ‘Login’ button there should be a user’s name displayed in the navigation menu next to a user icon, as well as a dropdown menu. Clicking on the user’s name or My Profile should show user profile info as per design 
## Tech Stack
* React 
* Typescript
* Redux or Contex api
## Code Quality Tools

 * Jest and React testing library for unit testing
 * Tslint
 * Husky for precomit/prepush hooks (lint on precommit and unit tests on prepush)
