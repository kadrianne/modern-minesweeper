import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Twemoji from 'react-twemoji'
import Board from './components/Board'
import GameButton from './components/GameButton'
import FlagCounter from './components/FlagCounter'
import Timer from './components/Timer'
import ScoreForm from './components/ScoreForm'
import ScoreBoard from './components/ScoreBoard'
import UserContainer from './components/UserContainer'
import Alert from './components/Alert'
import useHandleSnackbar from './hooks/handleSnackbar'

const backendURL = 'https://minesweeper-backend.herokuapp.com'

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}))

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiPopover: {
      // Name of the rule
      text: {
        // Some CSS
        color: 'white',
      },
    },
  },
})

function App() {

  const classes = useStyles()
  const dispatch = useDispatch()
  const [gameState, setGameState] = useState('new')
  const [newGame, setNewGame] = useState(false)
  const [difficulty, setDifficulty] = useState('Easy')
  const [flagsMarked, setFlagsMarked] = useState(0)
  const [seconds,setSeconds] = useState(0)
  const [timerOn, setTimerOn] = useState(false)
  const [highScores, setHighScores] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [openSnackbar, setOpenSnackbar, handleClose] = useHandleSnackbar(false)
  const scoreFormOpen = useSelector(state => state.scoreFormOpen)

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
    dispatch({ type: 'RESET' })
  }

  const displayText = () => {
    const text = {
      'won': '🎉 YOU WIN 🎉',
      'lost': '☠️ YOU LOSE ☠️'
    }

    return text[gameState]
  }

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

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
        dispatch({ type: 'OPEN_FORM' })
      }
  }, [gameState])

  const fetchHighScores = () => {
    fetch(`${backendURL}/highscores/${difficulty}`)
        .then(response => response.json())
        .then(setHighScores)
  }

  useEffect(() => {
    fetchHighScores()
  },[])
  
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
      <div className='instructions'>
        <Button className='play-button' variant='outlined' size='small' color='primary' aria-describedby={id} onClick={handlePopoverClick}>
          How to Play
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}>
              <h4>TO PLAY:</h4>
              <p className='popover-text'>Click on a cell to reveal. When a cell reveals a number, this number indicates the number of adjacent mines 💣</p>
              <p className='popover-text'>Right click on a cell to flag a mine. </p>
              <h4>TO WIN:</h4>
              <p className='popover-text'>Reveal all the cells that do not contain mines!</p>
          </Typography>
        </Popover>
      </div>
      <h2 className={gameState}>{displayText()}</h2>
      {scoreFormOpen === true ? <ScoreForm setOpenSnackbar={setOpenSnackbar} fetchHighScores={fetchHighScores} highScores={highScores} seconds={seconds} difficulty={difficulty} /> : null}
    <Alert message='Score Posted!' severity='success' handleClose={handleClose} openSnackbar={openSnackbar} />
    </div>
    <div className='right-container'>
      <ScoreBoard highScores={highScores} difficulty={difficulty} />
      <UserContainer difficulty={difficulty} gameState={gameState} />
    </div>
    </>
  )
}

export default App