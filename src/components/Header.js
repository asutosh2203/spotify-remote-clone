import React from 'react'
import './css/Header.css'
import { useDataLayerValue } from '../Context/DataLayer'
import { Search } from '@mui/icons-material'
import { Avatar } from '@mui/material'
const Header = () => {
  const [{ user }, dispatch] = useDataLayerValue()
  return (
    <div className='header'>
      <div className='header_left'>
        <Search />
        <input
          placeholder='Search for Artists, Songs or Podcasts'
          type='text'
        />
      </div>
      <div onClick={() => {}} className='header_right'>
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  )
}

export default Header
