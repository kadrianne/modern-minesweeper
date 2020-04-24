import React from 'react'
import Cell from './Cell'

export default function Board(props){

    const grid = []
    const rows = 9
    const columns = 9
    // const mines = 10

    const setupBoard = () => {
        for (let i = 1; i <= rows; i++){
            let row = []
            for (let j = 1; j <= columns; j++){
                row.push(<Cell x={i} y={j} />)
            }
            grid.push(row)
        }
        console.log(grid)
        return grid
        // return props.game.map(piece => {
            
        // })
    }

    return (
        <main className="board">
            {setupBoard()}
        </main>
    )
}