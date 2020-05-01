import React from 'react'
import GameButton from './GameButton'
import FlagCounter from './FlagCounter'

export default function Header(props){
    return (
        <header>
            <FlagCounter difficulty={props.difficulty} />
            <GameButton changeGameState={props.changeGameState} />
        </header>
    )
}