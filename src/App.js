import { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromUrl } from "./components/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player";
import { useDataLayerValue } from "./Context/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ accessToken, currentPlaylistID, currentPlayState }, dispatch] =
    useDataLayerValue();

  const getTokenFromLS = () => {
    const hash = getTokenFromUrl();
    localStorage.setItem("spotifyAccessToken", hash.access_token);
    localStorage.setItem("spotifyExpirationTime", hash.expires_in);
    window.location.hash = "";

    return hash.access_token;
  };

  useEffect(() => {
    var _token = getTokenFromLS();

    if (_token) {
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      dispatch({
        type: "SET_TOKEN",
        accessToken: _token,
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotifyObject: spotify,
      });

      spotify.getUserPlaylists().then((playlists) =>
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        })
      );

      spotify.getMyDevices().then((res) => {
        dispatch({
          type: "SET_DEVICES",
          devices: res.devices,
        });
      });

      spotify.getPlaylist(currentPlaylistID).then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        });
      });
    }
  }, [currentPlayState]);

  return <div className="app">{accessToken ? <Player /> : <Login />}</div>;
}

export default App;
