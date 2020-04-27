import React from 'react'
import Cell from './Cell'
import {getRandomInteger} from '../helpers.js'

export default class Board extends React.Component {

    state = {
        mines: 10,
        boardState: []
    }

    createBoard = () => {
        let board = []
    
        for (let i = 1; i <= this.props.rows; i++){
          let row = []
          for (let j = 1; j <= this.props.columns; j++){
              row.push(null)
          }
          board.push(row)
        }

        return board
    }

    renderBoard = (rows,columns) => {
        let renderedBoard = this.createBoard()
        
        for (let i = 1; i <= rows; i++){
            for (let j = 1; j <= columns; j++){
                renderedBoard[i-1][j-1] = <Cell x={i} y={j} value='' />
            }
        }
        
        let mines = 10
        let minePositions = []
        while (mines > 0){
            let i = getRandomInteger(1,rows)
            let j = getRandomInteger(1,columns)
            
            if (!minePositions.some(position => position === `${i},${j}`)) {
                renderedBoard[i-1][j-1] = <Cell x={i} y={j} value='💣' />
                minePositions.push(`${i},${j}`)
                mines--
            }
        }

        return renderedBoard
    }
    
    componentDidMount(){
        // let updatedBoardState = this.renderBoard().map(row => {
        //     return row.map(cell => {
        //         if (cell.props.value == '💣'){
        //             return 'mine'
        //         } else {
        //             return null
        //         }
        //     })
        // })

        // this.setState({
        //     boardState: updatedBoardState
        // })
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