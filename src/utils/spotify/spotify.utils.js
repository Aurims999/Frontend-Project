import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
let token = ""

const refreshSpotifyToken = async () => {
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
  
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Failed to fetch token: ${data.error_description || 'Unknown error'}`);
      }
  
      token = data.access_token;
    } catch (error) {
      console.error("Error in getSpotifyToken:", error);
      throw error;
    }
};

app.use(express.json());

/*
    - Spotify API token expires after 1h
    - To avoid accidental API call during the refresh process, the refresh method
    is called 3s earlier to give time for the Spotify API to generate new token
    and set it in the BE
*/
const REFRESH_TOKEN_INTERVAL_MS = 3597000 // 59 (minutes) * 60 (s) * 1000 (ms) + 57 (s) * 1000 (ms) = 59min 57s
refreshSpotifyToken();
setInterval(refreshSpotifyToken, REFRESH_TOKEN_INTERVAL_MS);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//#region TRACKS
app.get('/api/tracks', async (req, res) => {
  const { ids } = req.query;

  if(!ids) {
    return res.status(400).json({ error: 'Missing track IDs' });
  }

  try {
    const trackData = await fetchMultipleTracks(ids, token);
    res.json(trackData);
  } catch (error) {
    console.error('Error fetching track data:', error);
    res.status(500).json({ error: 'Failed to fetch track data' });
  }
});

app.get('/api/tracks/:trackId', async (req, res) => {
  const { trackId } = req.params;

  try {
    const trackData = await fetchTrackData(trackId, token);
    res.json(trackData);
  } catch (error) {
    console.error('Error fetching track data:', error);
    res.status(500).json({ error: 'Failed to fetch track data' });
  }
});

const fetchTrackData = async (trackId, token) => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error fetching track data: ${errorData.error.message}`);
  }

  return await response.json();
};

const fetchMultipleTracks = async (trackId, token) => {
  const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${trackId}`, {
      headers: { 
        'Authorization': `Bearer ${token}`, 
      }, 
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error data from Spotify API:', errorData);
  }

  return await response.json();
}
//#endregion

//#region ARTISTS
app.get('/api/artists/:artistId', async (req, res) => {
  const { artistId } = req.params;
  try {
      const artistData = await fetchArtistData(artistId, token);
      res.json(artistData);
  } catch (error) {
      console.error('Error fetching artist data:', error);
      res.status(500).json({ error: 'Failed to fetch artist data' });
  }
});

app.get('/api/artists', async (req, res) => {
  const { ids } = req.query;

  if(!ids) {
    return res.status(400).json({ error: 'Missing track IDs' });
  }

  try {
      const artists = await fetchMultipleArtists(ids, token);
      res.json(artists);
  } catch (error) {
      console.error('Error fetching multiple artists data:', error);
      res.status(500).json({ error: 'Failed to fetch artist data' });
  }
});

app.get('/api/artists/topTracks/:artistId', async(req, res) => {
  const { artistId } = req.params;

  try {
    const artistData = await fetchArtistTracks(artistId, token);
    res.json(artistData);
  } catch (error) {
    console.error('Error fetching artist tracks:', error);
    res.status(500).json({ error: 'Failed to fetch artist tracks' });
  }
})

const fetchArtistData = async (artistId, token) => {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching artist data: ${errorData.error.message}`);
  }

  return await response.json();
};

const fetchMultipleArtists = async (artistIds, token) => {
  const response = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching artist data: ${errorData.error.message}`);
  }

  return await response.json();
}

const fetchArtistTracks = async (artistId, token) => {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
      headers: { 
        'Authorization': `Bearer ${token}`, 
      }, 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error fetching artist track data: ${errorData.error.message}`);
  }

  return await response.json();
};
//#endregion

//#region PLAYLISTS
app.get('/api/tracks/playlist/:playlistId', async (req, res) => {
  const { playlistId } = req.params;
  const offset = parseInt(req.query.offset, 10) || 0

  try{
    const playlistInfo = await fetchPlaylistInfo(playlistId);
    const playlistTracks = await fetchPlaylistTracks(playlistId, offset)
    playlistInfo.tracks = playlistTracks.map(trackData => trackData.track.id);
    res.json({playlistInfo, playlistTracks});
  } catch (error) {
    console.error('Error fetching top songs:', error);
    res.status(500).json({ error: 'Failed to fetch top songs' });
  }
});

const fetchPlaylistInfo = async (playlistId) => {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}?fields=id,type,name,description,href,public,images(url),followers(total),owner`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(`Error fetching playlist: ${errorData.error.message}`);
  }

  return await response.json();
};

const fetchPlaylistTracks = async (playlistId, offset) => {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=5&offset=${offset}&fields=items(track)`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(`Error fetching playlist: ${errorData.error.message}`);
    return []
  }

  const responseData = await response.json();

  return responseData.items;
};
//#endregion