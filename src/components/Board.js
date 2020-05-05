import React from 'react'
import Cell from './Cell'
import { getRandomInteger } from '../helpers.js'

export default class Board extends React.Component {

    state = {
        minePositions: [],
        cellStates: [],
        boardValues: [],
        flagsBoard: []
    }

    lostGame = () => {
        const cellStates = this.state.cellStates
        const { changeGameState } = this.props

        this.state.minePositions.forEach(position => {
            const x = position.split(",")[0]
            const y = position.split(",")[1]

            cellStates[x][y] = true
        })
        
        this.setState({cellStates})
        changeGameState('lost')
    }

    updateCellStates = (x,y) => {
        const cellStates = this.state.cellStates

        cellStates[x][y] = true
        
        this.setState({cellStates})
    }

    countFlagsMarked = () => {
        const flagsMarked = this.state.flagsBoard.reduce((flagsMarked,row) => {
            const rowValue = row.reduce((acc,currentValue) => {
                if (currentValue === true){
                    return acc + 1
                } else {
                    return acc
                }
            },0)
            return flagsMarked + rowValue
        },0)

        this.props.updateFlagsMarked(flagsMarked)

    }

    updateFlagsBoard = (x,y,flaggedState) => {
        const flagsBoard = this.state.flagsBoard

        flagsBoard[x][y] = flaggedState

        // this.setState({flagsBoard})
        this.countFlagsMarked()
    }

    checkAdjacentCells = (x,y) => {
        const rows = [x-1,x,x+1]
        const cols = [y-1,y,y+1]
        const updatedCellState = this.state.cellStates

        rows.forEach(row => {
            if (row >= 0 && row <= 8){
                cols.forEach(col => {
                    if (col >= 0 && col <= 8){
                        if (this.state.cellStates[row][col] === false && this.state.flagsBoard[row][col] === false){
                            if (this.state.boardValues[row][col] === 0){
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
                        if (boardValues[row][col] === '💣'){
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
                        updateFlagsBoard={this.updateFlagsBoard}
                        updateFlagsMarked={this.updateFlagsMarked}
                        revealed={this.state.cellStates[x][y]}
                        flagged={this.state.flagsBoard[x][y]}
                        lostGame={this.lostGame}
                        gameState={this.props.gameState}
                        bombClicked={false}
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

    boardSetup = () => {
        const {rows,columns,mines} = this.props
        const boardValues = this.createBoard(rows,columns)
        const cellStates = this.createBoard(rows,columns)
        const flagsBoard = this.createBoard(rows,columns)

        let mineCount = mines
        let minePositions = []
        while (mineCount > 0){
            let i = getRandomInteger(1,rows) - 1
            let j = getRandomInteger(1,columns) - 1
    
            if (!minePositions.some(position => position === `${i},${j}`)) {
                boardValues[i][j] = '💣'
                minePositions.push(`${i},${j}`)
                mineCount--
            }
        }

        for (let x = 0; x < rows; x++){
            for (let y = 0; y < columns; y++){
                if (boardValues[x][y] !== '💣'){
                    boardValues[x][y] = this.countMines(x,y,boardValues)
                }
            }
        }

        this.setState({minePositions,boardValues,cellStates,flagsBoard})
    }

    componentDidMount(){
        this.boardSetup()
    }

    flagCellsWithMines = () => {
        const flagsBoard = [...this.state.flagsBoard]

        this.state.minePositions.forEach(position => {
            const x = position.split(",")[0]
            const y = position.split(",")[1]

            flagsBoard[x][y] = true
        })

        this.props.updateFlagsMarked(this.state.minePositions.length)
        this.setState({flagsBoard})
    }

    checkForWin = () => {
        const { rows,columns,mines,changeGameState } = this.props
        const cellStates = this.state.cellStates
        const revealedCells = cellStates.reduce((cellsRevealed,row) => {
            const rowValue = row.reduce((acc,currentValue) => {
                if (currentValue === true){
                    return acc + 1
                } else {
                    return acc
                }
            },0)
            return cellsRevealed + rowValue
        },0)

        const totalCells = rows * columns - mines
        if (revealedCells === totalCells){
            changeGameState('won')
            this.flagCellsWithMines()
        }
    }

    componentDidUpdate(previousProps,previousState){
        if (this.props.gameState !== 'won'){
            this.checkForWin()
        }
        if (this.props.newGame === true) {
            this.props.resetGame()
            this.boardSetup()
        }
    }

    handleClick = () => {
        const { gameState,startTimer } = this.props
        if (gameState === 'new'){
            startTimer()
        }
    }

    render(){
        const { rows,columns } = this.props
        return (
            <main className="board" onClick={this.handleClick}>
                {this.renderBoard(rows,columns)}
            </main>
        )
    }
}