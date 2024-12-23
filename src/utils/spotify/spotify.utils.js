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

refreshSpotifyToken();
setInterval(refreshSpotifyToken, 30 * 50 * 1000);

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

app.get('/api/tracks/playlist/:playlistId', async (req, res) => {
  const {playlistId} = req.params;

  try{
    const topSongs = await fetchPlaylistData(playlistId);
    res.json(topSongs);
  } catch (error) {
    console.error('Error fetching top songs:', error);
    res.status(500).json({ error: 'Failed to fetch top songs' });
  }
});

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const fetchPlaylistData = async (playlistId) => {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error fetching top artists: ${errorData.error.message}`);
  }

  return await response.json();
};

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

