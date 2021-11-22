import React from 'react'
import './css/Sidebar.css'
import small_logo from '../assets/spotify_small.png'
import { Home } from '@mui/icons-material'
import { Search } from '@mui/icons-material'
import { LibraryMusic } from '@mui/icons-material'
import SidebarOption from './SidebarOption'
import { useDataLayerValue } from '../Context/DataLayer'

const Sidebar = () => {
  const [{ playlists }, dispatch] = useDataLayerValue()
  return (
    <div className="sidebar">
      <img src={small_logo} />
      <SidebarOption title="Home" Icon={Home} />
      <SidebarOption title="Search" Icon={Search} />
      <SidebarOption title="Library" Icon={LibraryMusic} />

      <br />
      <strong className="sidebar_title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOption title={playlist.name} />
      ))}
    </div>
  )
}

export default Sidebar
