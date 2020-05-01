import React from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';

class App extends React.Component {
  state = {
    gameState: '',
    rows: 9,
    columns: 9,
    boardClass: 'small-board',
    difficulty: 'easy',
    flagsMarked: 0
  }

  changeGameState = (gameState) => {
    this.setState({gameState})
  }

  updateFlagsMarked = () => {
    this.setState({flagsMarked: this.state.flagsMarked + 1})
  }

  render(){
    return (
      <div className={this.state.boardClass}>
        <Header 
          changeGameState={this.changeGameState}
          difficulty={this.state.difficulty}
          flagsMarked={this.state.flagsMarked}
        />
        <Board 
          rows={this.state.rows}
          columns={this.state.columns}
          changeGameState={this.changeGameState}
          gameState={this.state.gameState}
          difficulty={this.state.difficulty}
          updateFlagsMarked={this.updateFlagsMarked}
        />
      </div>
    )
  }
}

export default App;
