import React from 'react'
import "./css/Player.css"
import Sidebar from './Sidebar'
import PlayerBody from './PlayerBody'
import PlayerConsole from './PlayerConsole'
const Player = () => {
    return (
        <div className="player">
            <div className="player_body">
                <Sidebar />
                <PlayerBody />
            </div>
            <PlayerConsole />
        </div>
    )
}

export default Player
