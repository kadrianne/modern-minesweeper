import React from 'react'
import Cell from './Cell'
import {getRandomInteger} from '../helpers.js'

export default class Board extends React.Component {

    state = {
        minePositions: [],
        cellStates: [],
        boardValues: [],
    }

    lostGame = () => {
        const revealedBoard = this.state.cellStates

        this.state.minePositions.forEach(position => {
            const x = position.split(",")[0]
            const y = position.split(",")[1]

            revealedBoard[x][y] = true
        })
        
        this.setState({cellStates: revealedBoard})
        this.props.changeGameState('lost')
    }

    clickedBomg
    updateCellStates = (x,y) => {
        const updatedCellState = this.state.cellStates

        updatedCellState[x][y] = true
        
        this.setState({
            cellStates: updatedCellState
        })
    }

    checkAdjacentCells = (x,y) => {
        const rows = [x-1,x,x+1]
        const cols = [y-1,y,y+1]
        const updatedCellState = this.state.cellStates

        rows.forEach(row => {
            if (row >= 0 && row <= 8){
                cols.forEach(col => {
                    if (col >= 0 && col <= 8){
                        if (this.state.cellStates[row][col] == false){
                            if (this.state.boardValues[row][col] == '0'){
                                updatedCellState[row][col] = true
                                this.checkAdjacentCells(row,col)
                            } else if (this.state.boardValues[row][col] !== '💣'){
                                updatedCellState[row][col] = true
                            }
                        }
                    }
                })
            }
        })

        this.setState({cellStates: updatedCellState})
    }

    countMines = (x,y,boardValues) => {
        const rows = [x-1,x,x+1]
        const cols = [y-1,y,y+1]
        let adjacentMines = 0

        rows.forEach(row => {
            if (row >= 0 && row <= 8){
                cols.forEach(col => {
                    if (col >= 0 && col <= 8){
                        if (boardValues[row][col] == '💣'){
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
                        lostGame={this.lostGame}
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
        const boardValues = this.createBoard(rows,columns)
        const cellStates = this.createBoard(rows,columns)

        let mines = 10
        let minePositions = []
        while (mines > 0){
            let i = getRandomInteger(1,rows) - 1
            let j = getRandomInteger(1,columns) - 1
    
            if (!minePositions.some(position => position == `${i},${j}`)) {
                boardValues[i][j] = '💣'
                minePositions.push(`${i},${j}`)
                mines--
            }
        }

        for (let x = 0; x < rows; x++){
            for (let y = 0; y < columns; y++){
                if (boardValues[x][y] != '💣'){
                    boardValues[x][y] = this.countMines(x,y,boardValues)
                }
            }
        }

        this.setState({minePositions,boardValues,cellStates})
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