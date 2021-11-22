export const authEndPoint = 'https://accounts.spotify.com/authorize'
const redirectUri = 'http://localhost:3000/'
const clientId = 'e8df76141234449394385aff734944a0'
const scopes = [
  'user-read-recently-played',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
  'playlist-read-private',
]

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=')
      initial[parts[0]] = decodeURIComponent(parts[1])
      return initial
    }, {})
}

export const loginURL = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`
