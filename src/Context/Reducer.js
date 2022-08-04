export const initialState = {
  accessToken: null,
  currentPlaylistID: '37i9dQZF1DX4WYpdgoIcn6',
  currentPlayState: {},
  devices: [],
  playlists: [],
  spotifyObject: null,
  user: null,
}

const reducer = (state, action) => {
  // console.log(action)

  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        accessToken: action.accessToken,
      }

    case 'SET_PLAYLIST':
      return {
        ...state,
        currentPlaylistID: action.currentPlaylistID,
      }

    case 'SET_CURRENTPLAYSTATE':
      return {
        ...state,
        currentPlayState: action.currentPlayState,
      }

    case 'SET_DEVICES':
      return {
        ...state,
        devices: action.devices,
      }

    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      }

    case 'SET_SPOTIFY':
      return {
        ...state,
        spotifyObject: action.spotifyObject,
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }

    case 'SET_LIKED_SONGS':
      return {
        ...state,
        discover_weekly: action.likedSongs,
      }

    case 'SET_DISCOVER_WEEKLY':
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      }

    default:
      return state
  }
}

export default reducer
