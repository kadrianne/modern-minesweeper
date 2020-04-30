import React from 'react'
import GameButton from './GameButton'

export default function Header(props){
    return (
        <header>
            <GameButton changeGameState={props.changeGameState} />
        </header>
    )
}