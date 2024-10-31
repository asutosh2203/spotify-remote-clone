export const authEndPoint = "https://accounts.spotify.com/authorize";

// const redirectUri = process.env.REACT_APP_REDIRECT_URI
const redirectUri = "http://localhost:3000";
// const clientId = process.env.REACT_APP_CLIENT_ID
const clientId = "098b757723f6413aab94b1daa00e3afd";
const scopes = [
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-library-read",
  "user-library-modify",
  "playlist-read-private",
  "playlist-read-collaborative",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginURL = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
