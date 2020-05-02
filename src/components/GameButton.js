import React from 'react'

export default function GameButton(props){

    const handleClick = (props) => {
        props.changeGameState('new')
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
        <button onClick={() => handleClick(props)}><span role='img'>{displayEmoji(props.gameState)}</span></button>
    )
}