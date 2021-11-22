import React from 'react'
import './css/SidebarOption.css'
const SidebarOption = ({ title, Icon }) => {
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebar_icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  )
}

export default SidebarOption
