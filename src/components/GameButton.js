import React from 'react'
import smiling from '../assets/smiling.svg'
import sunglasses from '../assets/sunglasses.svg'
import crying from '../assets/crying.svg'

export default function GameButton(props){

    const handleClick = ({ startNewGame,resetTimer }) => {
        startNewGame()
        resetTimer()
    }

    const displayEmoji = (gameState) => {
        const emojis = {
            'new': smiling,
            'won': sunglasses,
            'lost': crying
        }
        return emojis[gameState]
    }

    return (
        <input type='image' className='game-button' onClick={() => handleClick(props)} src={displayEmoji(props.gameState)} />
    )
}