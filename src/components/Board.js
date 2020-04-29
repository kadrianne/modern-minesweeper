import React from 'react'
import Cell from './Cell'
import {getRandomInteger} from '../helpers.js'

export default class Board extends React.Component {

    state = {
        mines: 10,
        boardState: []
    }

    countMines = (x,y) => {
        const rows = [x-1,x,x+1]
        const cols = [y-1,y,y+1]
        let adjacentMines = 0

        rows.forEach(row => {
            if (row >= 0 && row <= 8){
                cols.forEach(col => {
                    if (col >= 0 && col <= 8){
                        if (this.state.boardState[row][col] == 'mine'){
                            adjacentMines++
                        }
                    }
                })
            }
        })

        console.log(adjacentMines)
        return adjacentMines
    }

    revealCell = (i,j) => {
        const cellState = this.state.boardState[i-1][j-1]
        if (cellState == 'mine'){
            console.log('mine')
        } else {
            this.countMines(i-1,j-1)
        }
    }

    renderBoard = (rows,columns) => {
        let renderedBoard = this.props.board
        
        for (let i = 1; i <= rows; i++){
            for (let j = 1; j <= columns; j++){
                renderedBoard[i-1][j-1] = <Cell i={i} j={j} value='' revealCell={this.revealCell} />
            }
        }
        
        let mines = 10
        let minePositions = []
        while (mines > 0){
            let i = getRandomInteger(1,rows)
            let j = getRandomInteger(1,columns)
    
            if (!minePositions.some(position => position == `${i},${j}`)) {
                renderedBoard[i-1][j-1] = <Cell x={i} y={j} value='💣' revealCell={this.revealCell} />
                minePositions.push(`${i},${j}`)
                mines--
            }
        }
        
        return renderedBoard
    }
    
    componentDidMount(){
        let updatedBoardState = this.props.board.map(row => {
            return row.map(cell => {
                if (cell.props.value == '💣'){
                    return 'mine'
                } else {
                    return null
                }
            })
        })

        this.setState({
            boardState: updatedBoardState
        })
    }

    render(){
        const {rows,columns} = this.props
        return (
            <main className="board">
                {this.renderBoard(rows,columns)}
            </main>
        )
    }
}