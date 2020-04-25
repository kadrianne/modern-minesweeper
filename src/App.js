import React from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';

class App extends React.Component {
  state = {
    gameState: 'new',
    rows: 9,
    columns: 9
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

  render(){
    return (
      <>
      <div className="App">
        <Header />
        <Board board={this.createBoard()} rows={this.state.rows} columns={this.state.columns}/>
      </div>
      <footer>Icons made by <a href="https://www.flaticon.com/authors/creaticca-creative-agency" title="Creaticca Creative Agency">Creaticca Creative Agency</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></footer>
      </>
    )
  }
}

export default App;
