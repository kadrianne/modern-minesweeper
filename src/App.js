import React, { useState,useEffect } from 'react'
import Board from './components/Board'
import GameButton from './components/GameButton'
import FlagCounter from './components/FlagCounter'
import Timer from './components/Timer'
import ScoreForm from './components/ScoreForm'
import ScoreBoard from './components/ScoreBoard'
import UserContainer from './components/UserContainer'
import Alert from './components/Alert'
import useHandleSnackbar from './hooks/handleSnackbar'

const backendURL = 'http://localhost:4000'

function App() {

  const [gameState, setGameState] = useState('new')
  const [newGame, setNewGame] = useState(false)
  const [difficulty, setDifficulty] = useState('Easy')
  const [flagsMarked, setFlagsMarked] = useState(0)
  const [seconds,setSeconds] = useState(0)
  const [timerOn, setTimerOn] = useState(false)
  const [scoreFormOpen, setScoreFormOpen] = useState(false)
  const [highScores, setHighScores] = useState([])
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({})
  const [userScores, setUserScores] = useState([])
  const [openSnackbar, setOpenSnackbar, handleClose] = useHandleSnackbar(false)
  const [scoreSubmitted, setScoreSubmitted] = useState(false)

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

  const fetchHighScores = () => {
    fetch(`${backendURL}/highscores/${difficulty}`)
        .then(response => response.json())
        .then(setHighScores)
  }

  useEffect(() => {
    fetchHighScores()
  })
  
  return (
    <>
    <div className='left-container'>
      <h1>💣 MINESWEEPER 💣</h1>
      <div className={config[difficulty]['boardClass']}>
        <header>
            <FlagCounter difficulty={difficulty} flagsMarked={flagsMarked} />
            <GameButton startNewGame={startNewGame} gameState={gameState} resetTimer={resetTimer} />
            <Timer seconds={seconds} />
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
      {scoreFormOpen === true ? <ScoreForm gameState={gameState} userScores={userScores} setUserScores={setUserScores} scoreSubmitted={scoreSubmitted} setScoreSubmitted={setScoreSubmitted} setScoreFormOpen={setScoreFormOpen} setOpenSnackbar={setOpenSnackbar} loggedInUser={loggedInUser} userLoggedIn={userLoggedIn} fetchHighScores={fetchHighScores} highScores={highScores} seconds={seconds} difficulty={difficulty} /> : null}
    <Alert message='Score Posted!' severity='success' handleClose={handleClose} openSnackbar={openSnackbar} />
    </div>
    <div className='right-container'>
      <ScoreBoard highScores={highScores} difficulty={difficulty} />
      <UserContainer userScores={userScores} setUserScores={setUserScores} setScoreFormOpen={setScoreFormOpen} difficulty={difficulty} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
    </div>
    </>
  )
}

export default App