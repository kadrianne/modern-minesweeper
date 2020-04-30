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

  changeGameState = (gameState) => {
    this.setState({gameState})
  }

  render(){
    return (
      <div className={this.state.boardClass}>
        <Header changeGameState={this.changeGameState} />
        <Board rows={this.state.rows} columns={this.state.columns} changeGameState={this.changeGameState} />
      </div>
    )
  }
}

export default App;
