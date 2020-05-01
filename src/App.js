import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';

function App() {

  const [gameState, setGameState] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  const [flagsMarked, setflagsMarked] = useState(0)

  const config = {
    'easy': {
      'mines': 10,
      'rows': 9,
      'columns': 9,
      'boardClass': 'small-board'
    }
  }

  const changeGameState = (gameState) => setGameState(gameState)
  const updateFlagsMarked = (flagsMarked) => setflagsMarked(flagsMarked)
  
  return (
    <>
    <div className={config[difficulty]['boardClass']}>
      <Header 
        changeGameState={changeGameState}
        difficulty={difficulty}
        flagsMarked={flagsMarked}
      />
      <Board 
        rows={config[difficulty]['rows']}
        columns={config[difficulty]['columns']}
        mines={config[difficulty]['mines']}
        changeGameState={changeGameState}
        gameState={gameState}
        difficulty={difficulty}
        updateFlagsMarked={updateFlagsMarked}
      />
    </div>
    {gameState == 'won' ? <p class='win'>🎉 YOU WON 🎉</p> : null}
    </>
  )
}

export default App;
