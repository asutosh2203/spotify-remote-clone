import React from 'react'
import './css/Login.css'
import logo from '../assets/Spotify_Logo.png'
import { loginURL } from './spotify'
const Login = () => {
  return (
    <div className='login'>
      <img src={logo} alt='' width='50%' />
      <a href={loginURL}>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login
