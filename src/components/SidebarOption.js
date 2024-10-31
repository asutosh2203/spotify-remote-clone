import React from "react";
import { useDataLayerValue } from "../Context/DataLayer";
import "./css/SidebarOption.css";

import { AiOutlineSound } from "react-icons/ai";

const SidebarOption = ({ title, Icon, isPlaylist, playlist, isLikedSongs }) => {
  const [
    { spotifyObject, user, currentPlayState, currentPlaylistID },
    dispatch,
  ] = useDataLayerValue();

  const changePlaylist = (playlistID) => {
    dispatch({ type: "SET_PLAYLIST", currentPlaylistID: playlistID });
    localStorage.setItem("currentPlaylistId", playlistID);
    spotifyObject.getPlaylist(playlistID).then((response) => {
      console.log(response);
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      });
    });
  };

  if (isPlaylist) {
    return (
      <div
        className={`sidebarOption playlist_option ${
          currentPlaylistID == playlist?.id && "playlist_selected"
        }`}
        onClick={() => {
          changePlaylist(playlist?.id);
        }}
      >
        <p>{title}</p>
        {currentPlayState?.currentContext?.uri == playlist?.uri &&
          currentPlayState.isPlaying && (
            <AiOutlineSound color="#1ed15e" size={"16px"} />
          )}
      </div>
    );
  } else if (isLikedSongs) {
    return (
      <div
        className={`sidebarOption ${
          currentPlaylistID == `liked_songs_${user?.id}` && "playlist_selected"
        }`}
        onClick={() => {
          spotifyObject
            .getMySavedTracks()
            .then((response) => {
              console.log(response);
              const likedSongs = {
                id: `liked_songs_${user?.id}`,
                images: [
                  {
                    url: "https://i.pinimg.com/originals/fe/5c/36/fe5c36b8b4cbaa728f3c03a311e002cb.png",
                  },
                ],
                tracks: {
                  total: response.items.length,
                  items: response.items,
                },
                name: "Liked Songs",
                owner: {
                  display_name: user.display_name,
                },
                description: "Songs that you've Liked yet.",
              };
              dispatch({
                type: "SET_LIKED_SONGS",
                likedSongs: likedSongs,
              });
            })
            .catch((err) => {
              console.log(err);
            });
          dispatch({
            type: "SET_PLAYLIST",
            currentPlaylistID: `liked_songs_${user?.id}`,
          });
        }}
      >
        {Icon && <Icon className="sidebar_icon" />}
        <h4>{title}</h4>
      </div>
    );
  }

  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebar_icon" />}
      {<h4>{title}</h4>}
    </div>
  );
};

export default SidebarOption;
