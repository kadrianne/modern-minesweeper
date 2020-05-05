import React from 'react'

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
        <button className='game-button' onClick={() => handleClick(props)}><span role='img'>{displayEmoji(props.gameState)}</span></button>
    )
}