import React from 'react'
import Cell from './Cell'

export default class Board extends React.Component {

    state = {
        mines: 10
    }
    
    setupBoard = () => {
        let grid = []
        const rows = 9
        const columns = 9
        for (let i = 1; i <= rows; i++){
            let row = []
            for (let j = 1; j <= columns; j++){
                row.push(<Cell x={i} y={j} value='💣' />)
            }
            grid.push(row)
        }
        return grid
    }

    render(){
        return (
            <main className="board">
                {this.setupBoard()}
            </main>
        )
    }
}