import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const getSpotifyToken = async () => {
    const authOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    };
  
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    const data = await response.json();
    return data.access_token;
};

const token = await getSpotifyToken();

const fetchArtistData = async (artistId) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
};

const artistId = "0TnOYISbd1XYRBk9myaseg";
const tracks = await fetchArtistData(artistId);
console.log(tracks);

