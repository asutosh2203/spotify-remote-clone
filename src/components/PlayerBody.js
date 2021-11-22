import './css/PlayerBody.css'
import { useDataLayerValue } from '../Context/DataLayer'
import Header from './Header'
import {
  Favorite,
  MoreHoriz,
  PlayCircleFilledOutlined,
} from '@mui/icons-material'
import SongRow from './SongRow'
const PlayerBody = () => {
  const [{ discover_weekly }, dispatch] = useDataLayerValue()
  console.log(discover_weekly)
  return (
    <div className="body">
      <Header />

      <div className="body_info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body_info_text">
          <strong>PLAYLIST</strong>
          <h2>{discover_weekly?.name}</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledOutlined className="body_play_button" />
          <Favorite fontSize="large" />
          <MoreHoriz />
        </div>
        {discover_weekly?.tracks.items.map((item) => (
          <SongRow track={item.track} />
        ))}
      </div>
    </div>
  )
}

export default PlayerBody
