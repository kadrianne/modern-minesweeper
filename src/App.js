import React, { useState } from 'react'
import Board from './components/Board'
import GameButton from './components/GameButton'
import FlagCounter from './components/FlagCounter'
import Timer from './components/Timer'

function App() {

  const [gameState, setGameState] = useState('new')
  const [difficulty, setDifficulty] = useState('easy')
  const [flagsMarked, setFlagsMarked] = useState(0)
  const [timerOn, setTimerOn] = useState(false)

  const config = {
    'easy': {
      'mines': 10,
      'rows': 9,
      'columns': 9,
      'boardClass': 'small-board'
    }
  }

  const changeGameState = (gameState) => setGameState(gameState)
  const updateFlagsMarked = (flagsMarked) => setFlagsMarked(flagsMarked)

  const displayText = () => {

    const text = {
      'won': '🎉 YOU WIN 🎉',
      'lost': '☠️ YOU LOSE ☠️'
    }

    return text[gameState]

  }
  
  return (
    <>
    <div className={config[difficulty]['boardClass']}>
      <header>
          <FlagCounter difficulty={difficulty} flagsMarked={flagsMarked} />
          <GameButton changeGameState={changeGameState} gameState={gameState} />
          <Timer timerOn={timerOn} />
      </header>
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
    <p class={gameState}>{displayText()}</p>
    </>
  )
}

export default App;
