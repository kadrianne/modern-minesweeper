import React, { useState,useEffect } from 'react'
import Board from './components/Board'
import GameButton from './components/GameButton'
import FlagCounter from './components/FlagCounter'
import Timer from './components/Timer'
import ScoreForm from './components/ScoreForm'
import ScoreBoard from './components/ScoreBoard'

function App() {

  const [gameState, setGameState] = useState('new')
  const [newGame, setNewGame] = useState(false)
  const [difficulty, setDifficulty] = useState('Easy')
  const [flagsMarked, setFlagsMarked] = useState(0)
  const [seconds,setSeconds] = useState(0)
  const [timerOn, setTimerOn] = useState(false)
  const [scoreFormOpen, setScoreFormOpen] = useState(false)

  const config = {
    'Easy': {
      'mines': 10,
      'rows': 9,
      'columns': 9,
      'boardClass': 'small-board'
    }
  }

  const changeGameState = (gameState) => setGameState(gameState)
  const updateFlagsMarked = (flagsMarked) => setFlagsMarked(flagsMarked)

  const startTimer = () => setTimerOn(true)
  const stopTimer = () => setTimerOn(false)
  const resetTimer = () => {
    setSeconds(0)
    setTimerOn(false)
  }

  const startNewGame = () => setNewGame(true)
  const resetGame = () => {
    setNewGame(false)
    setGameState('new')
    setFlagsMarked(0)
    setScoreFormOpen(false)
  }

  const displayText = () => {
    const text = {
      'won': '🎉 YOU WIN 🎉',
      'lost': '☠️ YOU LOSE ☠️'
    }

    return text[gameState]
  }

  useEffect(() => {
    let interval = null
    if (timerOn === true){
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerOn,seconds])

  useEffect(() => {
      stopTimer()
      if (gameState === 'won') {
        setScoreFormOpen(true)
      }
  }, [gameState])
  
  return (
    <>
    <div className={config[difficulty]['boardClass']}>
      <header>
          <FlagCounter difficulty={difficulty} flagsMarked={flagsMarked} />
          <GameButton startNewGame={startNewGame} gameState={gameState} resetTimer={resetTimer} />
          <Timer timerOn={timerOn} seconds={seconds} />
      </header>
      <Board 
        newGame={newGame}
        resetGame={resetGame}
        rows={config[difficulty]['rows']}
        columns={config[difficulty]['columns']}
        mines={config[difficulty]['mines']}
        changeGameState={changeGameState}
        gameState={gameState}
        difficulty={difficulty}
        updateFlagsMarked={updateFlagsMarked}
        startTimer={startTimer}
      />
    </div>
    <h2 className={gameState}>{displayText()}</h2>
    {scoreFormOpen === true ? <ScoreForm seconds={seconds} difficulty={difficulty} /> : null}
    <ScoreBoard />
    </>
  )
}

export default App;
