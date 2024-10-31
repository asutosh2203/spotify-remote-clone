import "./css/PlayerBody.css";
import { useDataLayerValue } from "../Context/DataLayer";
import Header from "./Header";
import {
  Favorite,
  MoreHoriz,
  PlayCircleFilledOutlined,
} from "@mui/icons-material";
import { BiTime } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import SongRow from "./SongRow";
import { getTokenFromUrl } from "./spotify";
const PlayerBody = () => {
  const [{ discover_weekly, spotifyObject, devices }, dispatch] =
    useDataLayerValue();

  const totalDuration =
    discover_weekly?.tracks.total > 0
      ? discover_weekly?.tracks.items.reduce(
          (prevValue, currValue) => prevValue + currValue.track?.duration_ms,
          0
        )
      : 0;

  const durationConverted = new Date(totalDuration)
    .toISOString()
    .slice(11, -5)
    .split(":");

  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="body">
      <Header />
      <button
        onClick={() => {
          spotifyObject
            .search("har ek pal", ["track"])
            .then((res) => console.log(res));
        }}
      >
        search songs
      </button>
      <button
        onClick={() => {
          spotifyObject.getMyDevices().then((res) => console.log(res));
        }}
      >
        show devices
      </button>
      <div className="body_info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body_info_text">
          <strong>PLAYLIST</strong>
          <h2>{discover_weekly?.name}</h2>
          <p className="playlist_desc">{discover_weekly?.description}</p>
          <div className="addnl_details">
            <p className="owner">{discover_weekly?.owner?.display_name}</p>
            <BsDot />
            {discover_weekly?.followers && (
              <p>
                {numberWithCommas(discover_weekly?.followers?.total)} likes
                <BsDot className="second_dot" />
              </p>
            )}

            <p>{discover_weekly?.tracks.total} songs</p>
          </div>
          <div className="totalDuration">
            {parseInt(durationConverted[0]) > 0 && (
              <p>{parseInt(durationConverted[0])} hr</p>
            )}
            {parseInt(durationConverted[1]) > 0 && (
              <p>{parseInt(durationConverted[1])} min</p>
            )}
          </div>
        </div>
      </div>
      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledOutlined
            className="body_play_button"
            onClick={() => {
              spotifyObject.play({
                context_uri: discover_weekly.uri,
              });
            }}
          />
          <Favorite fontSize="large" />
          <MoreHoriz />
        </div>
        <div className="songs_header">
          <div className="track_name">Title</div>
          <div className="track_details">
            <p className="album_name">Album</p>
            <div className="track_details_right">
              <p className="date_added">Date Added</p>
              <p className="duration">
                <BiTime />
              </p>
            </div>
          </div>
        </div>
        {discover_weekly?.tracks.items.map((item, index) => (
          <SongRow key={index} tracks={item} />
        ))}
      </div>
    </div>
  );
};

export default PlayerBody;
