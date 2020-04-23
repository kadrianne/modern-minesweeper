import React from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';

class App extends React.Component {
  state = {
    game: ['X',null,null,null,null,null,null,'X',null]
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Board game={this.state.game}/>
      </div>
    )
  }
}

export default App;
