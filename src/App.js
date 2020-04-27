import React from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';

class App extends React.Component {
  state = {
    gameState: '',
    rows: 9,
    columns: 9,
    boardClass: 'small-board'
  }

  createBoard = () => {
    let board = []

    for (let i = 1; i <= this.state.rows; i++){
      let row = []
      for (let j = 1; j <= this.state.columns; j++){
          row.push(null)
      }
      board.push(row)
    }

    return board
  }

  newGame = () => {

  }

  changeGameState = () => {
    this.setState({
      gameState: 'new'
    })
  }

  render(){
    return (
      <div className={this.state.boardClass}>
        <Header changeGameState={this.changeGameState} />
        <Board board={this.createBoard()} rows={this.state.rows} columns={this.state.columns} />
      </div>
    )
  }
}

export default App;
