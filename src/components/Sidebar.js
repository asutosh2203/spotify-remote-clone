import React from 'react'
import './css/Sidebar.css'
import small_logo from '../assets/spotify_small.png'
import { Home, Search, LibraryMusic, FavoriteBorder } from '@mui/icons-material'
import SidebarOption from './SidebarOption'
import { useDataLayerValue } from '../Context/DataLayer'

const Sidebar = () => {
  const [{ playlists }] = useDataLayerValue()

  return (
    <div className='sidebar'>
      <img src={small_logo} />
      <SidebarOption title='Home' Icon={Home} />
      <SidebarOption title='Search' Icon={Search} />
      <SidebarOption title='Library' Icon={LibraryMusic} />
      <br />
      <SidebarOption
        title='Liked Songs'
        isLikedSongs={true}
        Icon={FavoriteBorder}
      />
      <br />
      <strong className='sidebar_title'>PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist, index) => (
        <SidebarOption
          key={index}
          title={playlist.name}
          isPlaylist={true}
          playlist={playlist}
        />
      ))}
    </div>
  )
}

export default Sidebar
