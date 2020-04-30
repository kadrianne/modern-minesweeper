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

    revealCell = (x,y) => {
        const cellState = this.state.boardState[x][y]
        if (cellState == 'mine'){
            console.log('mine')
        } else {
            this.countMines(x,y)
        }
    }

    renderBoard = (rows,columns) => {
        let x = -1
        return this.state.boardState.map(row => {
            x++
            let y = -1
            return row.map(cell => {
                y++
                if (cell == null){
                    return <Cell x={x} y={y} value='' revealCell={this.revealCell} />
                } else {
                    return <Cell x={x} y={y} value='💣' revealCell={this.revealCell} />
                }
            })
        })
    }
 
    componentDidMount(){
        const {rows,columns,board} = this.props
        const updatedBoardState = board

        let mines = 10
        let minePositions = []
        while (mines > 0){
            let i = getRandomInteger(1,rows)
            let j = getRandomInteger(1,columns)
    
            if (!minePositions.some(position => position == `${i},${j}`)) {
                updatedBoardState[i-1][j-1] = 'mine'
                minePositions.push(`${i},${j}`)
                mines--
            }
        }

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