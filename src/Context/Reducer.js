export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  accessToken: null,
  spotifyObject: null,
}

const reducer = (state, action) => {
  console.log(action)

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }

    case 'SET_TOKEN':
      return {
        ...state,
        accessToken: action.accessToken,
      }

    case 'SET_SPOTIFY':
      return {
        ...state,
        spotifyObject: action.spotifyObject,
      }

    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      }

    case 'SET_DISCOVER_WEEKLY':
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      }

    case 'SET_PLAYING':
      return {
        ...state,
        playing: action.playing,
      }

    case 'SET_ITEM':
      return {
        ...state,
        item: action.item,
      }

    default:
      return state
  }
}

export default reducer
