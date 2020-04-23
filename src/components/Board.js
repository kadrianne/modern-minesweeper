import React from 'react'
import Cell from './Cell'

export default function Board(props){

    const setupBoard = () => {
        return props.game.map(piece => {
            return <Cell mine={piece} />
        })
    }

    return (
        <main className="board">
            {setupBoard()}
        </main>
    )
}