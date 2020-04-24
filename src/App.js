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
      <>
      <div className="App">
        <Header />
        <Board game={this.state.game}/>
      </div>
      <footer>Icons made by <a href="https://www.flaticon.com/authors/creaticca-creative-agency" title="Creaticca Creative Agency">Creaticca Creative Agency</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></footer>
      </>
    )
  }
}

export default App;
