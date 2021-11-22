import React, { useEffect } from 'react'
import { useDataLayerValue } from '../Context/DataLayer'
import './css/PlayerConsole.css'
import {
  PlayCircleFilledOutlined,
  SkipPrevious,
  SkipNext,
  Shuffle,
  Repeat,
  PlaylistPlay,
  PauseCircleFilledOutlined,
  VolumeDown,
} from '@mui/icons-material'
import { Slider } from '@mui/material'
const PlayerConsole = () => {
  const [{ spotifyObject, item, playing }, dispatch] = useDataLayerValue()

  useEffect(() => {
    spotifyObject.getMyCurrentPlaybackState().then((res) => {
      dispatch({
        type: 'SET_PLAYING',
        playing: res.is_playing,
      })

      dispatch({
        type: 'SET_ITEM',
        item: res.item,
      })
    })
  }, [spotifyObject])

  const handlePlayPause = () => {
    if (playing) {
      spotifyObject.pause()
      dispatch({
        type: 'SET_PLAYING',
        playing: false,
      })
    } else {
      spotifyObject.play()
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      })
    }
  }

  const skipNext = () => {
    spotifyObject.skipToNext()
    spotifyObject.getMyCurrentPlayingTrack().then((res) => {
      dispatch({
        type: 'SET_ITEM',
        item: res.item,
      })
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      })
    })
  }

  const skipPrevious = () => {
    spotifyObject.skipToPrevious()
    spotifyObject.getMyCurrentPlayingTrack().then((res) => {
      dispatch({
        type: 'SET_ITEM',
        item: res.item,
      })
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      })
    })
  }

  return (
    <div className="console">
      <div className="console_left">
        <img
          className="console_album"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="song_info">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(', ')}</p>
          </div>
        ) : (
          <div className="song_info">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>
      <div className="console_center">
        <Shuffle className="console_green" />
        <SkipPrevious onClick={skipPrevious} className="console_icon" />
        {playing ? (
          <PauseCircleFilledOutlined
            onClick={handlePlayPause}
            fontSize="large"
            className="console_icon"
          />
        ) : (
          <PlayCircleFilledOutlined
            onClick={handlePlayPause}
            fontSize="large"
            className="console_icon"
          />
        )}

        <SkipNext onClick={skipNext} className="console_icon" />
        <Repeat className="console_green" />
      </div>
      <div className="console_right">
        <PlaylistPlay className="console_right_icons" />
        <VolumeDown className="console_right_icons" />
        <Slider />
      </div>
    </div>
  )
}

export default PlayerConsole
