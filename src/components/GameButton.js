import React from 'react'

export default function GameButton(props){
    return (
        <button onClick={props.changeGameState}><span role='img'>🙂</span></button>
    )
}