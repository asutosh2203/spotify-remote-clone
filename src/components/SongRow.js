import React from "react";
import { useDataLayerValue } from "../Context/DataLayer";
import "./css/SongRow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import songNotfound from "../assets/song-not-found.png";

const SongRow = ({ tracks }) => {
  const [{ spotifyObject, devices }] = useDataLayerValue();

  const track = tracks.track;
  const mins = Math.floor(track.duration_ms / 1000 / 60);
  const secs = Math.round((track.duration_ms - mins * 1000 * 60) / 1000);

  const secCharacters = secs.toString().length;

  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const dateAdded = new Date(tracks.added_at);

  const playSong = () => {
    devices.length > 0
      ? spotifyObject
          .play({
            uris: [track.uri],
            device_id: devices[0].id,
          })
          .catch((err) => {
            console.log(JSON.parse(err.response).error.message);
          })
      : console.log("No device connected");
  };

  return (
    <>
      <ToastContainer />
      <div className="songRow" onClick={playSong}>
        <div className="songRow_album_info">
          <img
            className="songRow_album"
            src={
              track.album.images[0] ? track.album.images[0].url : songNotfound
            }
            alt=""
          />
          <div className="songRow_info">
            <h1>{track.name}</h1>
            <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        </div>
        <div className="songRow_details">
          <div className="songRow_details_track_name">{track.album.name}</div>
          <div className="songRow_details_right">
            <div>{dateAdded.toLocaleDateString("en-US", dateOptions)}</div>
            <div>{`${mins}:${secCharacters === 1 ? "0" + secs : secs}`}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongRow;
