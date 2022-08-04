import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import { getTokenFromUrl } from './components/spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import Player from './components/Player'
import { useDataLayerValue } from './Context/DataLayer'

const spotify = new SpotifyWebApi()

function App() {
  const [{ accessToken, currentPlaylistID, currentPlayState }, dispatch] =
    useDataLayerValue()

  useEffect(() => {
    const hash = getTokenFromUrl()
    window.location.hash = ''
    var _token = hash.access_token

    if (_token) {
      spotify.setAccessToken(_token)
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user,
        })
      })

      dispatch({
        type: 'SET_TOKEN',
        accessToken: _token,
      })

      dispatch({
        type: 'SET_SPOTIFY',
        spotifyObject: spotify,
      })

      spotify.getUserPlaylists().then((playlists) =>
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists,
        })
      )

      spotify.getMyDevices().then((res) => {
        dispatch({
          type: 'SET_DEVICES',
          devices: res.devices,
        })
      })
      
      spotify.getPlaylist(currentPlaylistID).then((response) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        })
      })
    }
  }, [currentPlayState])



  return <div className='app'>{accessToken ? <Player /> : <Login />}</div>
}

export default App
