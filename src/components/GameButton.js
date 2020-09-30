import React from 'react'
import Twemoji from 'react-twemoji'

export default function GameButton(props){

    const handleClick = ({ startNewGame,resetTimer }) => {
        startNewGame()
        resetTimer()
    }

    const displayEmoji = (gameState) => {
        const emojis = {
            'new': '🙂',
            'won': '😎',
            'lost': '😭'
        }
        return emojis[gameState]
    }

    return (
        <button type='image' className='game-button' onClick={() => handleClick(props)}><Twemoji options={{ className: 'emoji' }}><span>{displayEmoji(props.gameState)}</span></Twemoji></button>
    )
}