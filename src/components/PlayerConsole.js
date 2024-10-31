import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../Context/DataLayer";
import "./css/PlayerConsole.css";
import { PlaylistPlay, VolumeDown } from "@mui/icons-material";
import { Slider } from "@mui/material";
import {
  BiShuffle,
  BiSkipPrevious,
  BiPlayCircle,
  BiPauseCircle,
  BiSkipNext,
} from "react-icons/bi";
import { BsArrowRepeat, BsDot } from "react-icons/bs";
import ProgressBar from "@ramonak/react-progress-bar";
import { debounce } from "../utils";

const PlayerConsole = () => {
  const [songVolume, setSongVolume] = useState(0);
  const [{ spotifyObject, currentPlayState, devices }, dispatch] =
    useDataLayerValue();

  const song = currentPlayState.currentTrack;

  // console.log(currentPlayState)

  useEffect(() => {
    spotifyObject.getMyCurrentPlaybackState().then((res) => {
      // console.log(res)

      const playState = {
        isPlaying: res.is_playing,
        repeatState: res.repeat_state,
        shuffleState: res.shuffle_state,
        currentTrack: res.item,
        currentContext: res.context,
        progress: res.progress_ms,
      };

      dispatch({
        type: "SET_CURRENTPLAYSTATE",
        currentPlayState: playState,
      });
    });
  }, [spotifyObject, song]);

  // devices.map((device) => {
  //   // console.log(device)
  //   if (device.is_active) {
  //     setSongVolume(device.volume_percent);
  //   }
  // });

  const handlePlayPause = () => {
    if (currentPlayState.isPlaying) {
      spotifyObject.pause();

      dispatch({
        type: "SET_CURRENTPLAYSTATE",
        currentPlayState: { ...currentPlayState, isPlaying: false },
      });
    } else {
      spotifyObject.play();
      dispatch({
        type: "SET_CURRENTPLAYSTATE",
        currentPlayState: { ...currentPlayState, isPlaying: true },
      });
    }
  };

  const skipNext = () => {
    spotifyObject.skipToNext();
    spotifyObject.getMyCurrentPlayingTrack().then((res) => {
      dispatch({
        type: "SET_CURRENTPLAYSTATE",
        currentPlayState: {
          ...currentPlayState,
          isPlaying: true,
          currentTrack: res.item,
        },
      });
    });
  };

  const skipPrevious = () => {
    spotifyObject.skipToPrevious();
    spotifyObject.getMyCurrentPlayingTrack().then((res) => {
      dispatch({
        type: "SET_CURRENTPLAYSTATE",
        currentPlayState: {
          ...currentPlayState,
          isPlaying: true,
          currentTrack: res.item,
        },
      });
    });
  };

  const toggleRepeat = () => {
    if (currentPlayState.repeatState == "off") {
      spotifyObject
        .setRepeat("track")
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
      dispatch({
        type: "SET_CURRENTPLAYSTATE",
        currentPlayState: {
          ...currentPlayState,
          repeatState: "track",
        },
      });
    } else {
      spotifyObject.setRepeat("off");
      dispatch({
        type: "SET_CURRENTPLAYSTATE",
        currentPlayState: {
          ...currentPlayState,
          repeatState: "off",
        },
      });
    }
  };

  const toggleShuffle = () => {
    if (currentPlayState.shuffleState) {
      spotifyObject.setShuffle(false);
      dispatch({
        type: "SET_CURRENTPLAYSTATE",
        currentPlayState: {
          ...currentPlayState,
          shuffleState: false,
        },
      });
    } else {
      spotifyObject.setShuffle(true);
      dispatch({
        type: "SET_CURRENTPLAYSTATE",
        currentPlayState: {
          ...currentPlayState,
          shuffleState: true,
        },
      });
    }
  };

  const setVolumeInSpotify = debounce((newVolume) => {
    spotifyObject
      .setVolume(newVolume)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to set volume");
      })
      .catch((error) => console.error(error));
  }, 1000);

  const handleVolumeChange = (event, volume) => {
    setSongVolume(volume);
    setVolumeInSpotify(volume);
  };

  return (
    <div className={`console ${!currentPlayState.currentTrack && "hidden"}`}>
      <div className="console_left">
        <img
          className="console_album"
          src={currentPlayState.currentTrack?.album?.images[0].url}
          alt={song?.name}
        />
        {song ? (
          <div className="song_info">
            <h4>{song.name}</h4>
            <p className="song_info_artists">
              {song.artists?.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        ) : (
          <div className="song_info">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>
      <div className="console_center">
        <div className="console_controls">
          {currentPlayState.shuffleState ? (
            <div className="shuffle_repeat">
              <BiShuffle
                onClick={toggleShuffle}
                size={22}
                className="console_green"
              />
              <BsDot className="console_dot console_green" />
            </div>
          ) : (
            <BiShuffle
              onClick={toggleShuffle}
              size={22}
              className="console_icon"
            />
          )}
          <BiSkipPrevious
            size={26}
            onClick={skipPrevious}
            className="console_icon"
          />
          {currentPlayState.isPlaying ? (
            <BiPauseCircle
              size={36}
              onClick={handlePlayPause}
              className="console_icon"
            />
          ) : (
            <BiPlayCircle
              size={36}
              onClick={handlePlayPause}
              className="console_icon"
            />
          )}
          <BiSkipNext size={26} onClick={skipNext} className="console_icon" />
          {currentPlayState.repeatState == "off" ? (
            <BsArrowRepeat
              size={22}
              className="console_icon"
              onClick={toggleRepeat}
            />
          ) : (
            <div className="shuffle_repeat">
              <BsArrowRepeat
                size={22}
                className="console_green"
                onClick={toggleRepeat}
              />
              <BsDot className="console_dot console_green" />
            </div>
          )}
        </div>
        <div className="console_song_progress">
          <p className="track_time">
            {new Date(currentPlayState?.progress || 0)
              .toISOString()
              .slice(14, -5)}
          </p>
          <ProgressBar
            transitionDuration="0s"
            baseBgColor="#5E5E5E"
            bgColor="#fff"
            completed={currentPlayState?.progress}
            maxCompleted={currentPlayState?.currentTrack?.duration_ms}
            isLabelVisible={false}
            height="3px"
          />
          <p className="track_time">
            {new Date(currentPlayState?.currentTrack?.duration_ms || 0)
              .toISOString()
              .slice(14, -5)}
          </p>
        </div>
      </div>
      <div className="console_right">
        <PlaylistPlay className="console_right_icons" />
        <VolumeDown className="console_right_icons" />
        <Slider value={songVolume} onChange={handleVolumeChange} />
      </div>
    </div>
  );
};

export default PlayerConsole;
