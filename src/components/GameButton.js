import React from 'react'

export default function GameButton(props){

    const handleClick = (props) => {
        props.changeGameState('new')
    }

    return (
        <button onClick={() => handleClick(props)}><span role='img'>🙂</span></button>
    )
}