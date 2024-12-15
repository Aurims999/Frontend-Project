export const fetchPlaylist = async (playlistId : string) => {
  try{
    const response = await fetch(`http://localhost:5000/api/tracks/playlist/${playlistId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const playlist = await response.json();

    return playlist

  } catch (error) {
    console.error("Error while fetching spotify playlists: ", error)
  }
};