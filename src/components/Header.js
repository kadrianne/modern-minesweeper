import React from 'react'
import GameButton from './GameButton'
import FlagCounter from './FlagCounter'

export default function Header(props){
    return (
        <header>
            <FlagCounter difficulty={props.difficulty} flagsMarked={props.flagsMarked} />
            <GameButton changeGameState={props.changeGameState} gameState={props.gameState} />
        </header>
    )
}