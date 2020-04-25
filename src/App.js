import React from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';

class App extends React.Component {
  state = {
    gameState: 'New'
  }

  createBoard = () => {
    const board = ['X',null,null,null,null,null,null,'X',null]
    return board
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Board board={this.createBoard}/>
      </div>
    )
  }
}

export default App;
