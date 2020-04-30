import React from 'react'
import Cell from './Cell'
import {getRandomInteger} from '../helpers.js'

export default class Board extends React.Component {

    state = {
        cellStates: [],
        boardValues: [],
    }

    checkAdjacentCells = (x,y) => {
        console.log(x,y)
    }

    updateCellStates = (x,y) => {
        const updatedCellState = this.state.cellStates

        updatedCellState[x][y] = true

        this.setState({
            cellStates: updatedCellState
        })
    }

    countMines = (x,y,updatedBoardValues) => {
        const rows = [x-1,x,x+1]
        const cols = [y-1,y,y+1]
        let adjacentMines = 0

        rows.forEach(row => {
            if (row >= 0 && row <= 8){
                cols.forEach(col => {
                    if (col >= 0 && col <= 8){
                        if (updatedBoardValues[row][col] == '💣'){
                            adjacentMines++
                        }
                    }
                })
            }
        })

        return adjacentMines
    }

    renderBoard = (rows,columns) => {
        let x = -1
        return this.state.boardValues.map(row => {
            x++
            let y = -1
            return row.map(cell => {
                y++
                const cellClass = {
                    '💣': 'bomb',
                    0: 'zero',
                    1: 'blue',
                    2: 'green',
                    3: 'red',
                    4: 'purple',
                    5: 'magenta',
                    6: 'turquoise',
                    7: 'black',
                    8: 'yellow'
                }
                return (
                    <Cell 
                        x={x}
                        y={y}
                        value={cell}
                        iconClass={cellClass[cell]}
                        checkAdjacentCells={this.checkAdjacentCells}
                        updateCellStates={this.updateCellStates}
                        revealed={this.state.cellStates[x][y]}
                    />
                )
            })
        })
    }
 
    createBoard = (rows,columns) => {
        let board = []

        for (let i = 1; i <= rows; i++){
            let row = []
            for (let j = 1; j <= columns; j++){
                row.push(false)
            }
            board.push(row)
        }

        return board
    }

    componentDidMount(){
        const {rows,columns} = this.props
        const updatedBoardValues = this.createBoard(rows,columns)
        const initialCellStates = this.createBoard(rows,columns)

        let mines = 10
        let minePositions = []
        while (mines > 0){
            let i = getRandomInteger(1,rows)
            let j = getRandomInteger(1,columns)
    
            if (!minePositions.some(position => position == `${i},${j}`)) {
                updatedBoardValues[i-1][j-1] = '💣'
                minePositions.push(`${i},${j}`)
                mines--
            }
        }

        for (let x = 0; x < rows; x++){
            for (let y = 0; y < columns; y++){
                if (updatedBoardValues[x][y] != '💣'){
                    updatedBoardValues[x][y] = this.countMines(x,y,updatedBoardValues)
                }
            }
        }

        this.setState({
            boardValues: updatedBoardValues,
            cellStates: initialCellStates
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