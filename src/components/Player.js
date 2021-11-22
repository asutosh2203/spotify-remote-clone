import React from 'react'
import "./css/Player.css"
import { useDataLayerValue } from '../Context/DataLayer'
import Sidebar from './Sidebar'
import PlayerBody from './PlayerBody'
import PlayerConsole from './PlayerConsole'
const Player = () => {
    const [{}, dispatch] = useDataLayerValue()
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
