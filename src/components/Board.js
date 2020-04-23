import React from 'react'
import Cell from './Cell'

export default function Board(){
    const game = ['X',null,null,null,null,null,null,'X',null]

    const setupBoard = () => {
        return game.map(piece => {
            return <Cell mine={piece} />
        })
    }

    return (
        <main className="board">
            {setupBoard()}
        </main>
    )
}