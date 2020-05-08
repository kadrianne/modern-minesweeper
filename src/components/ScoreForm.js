import React, { useState,useEffect } from 'react'
import { Button,Input } from '@material-ui/core'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'

const backendURL = 'http://localhost:4000'
const styles = {
    buttonRoot: {
      background: '#a675cb',
      borderRadius: 1,
      color: '#faf0e6',
      height: 40,
      width: 80,
      margin: 10,
      '&:hover': {
          background: 'hsl(190,80%,50%)',
        }
    },
    inputRoot: {
        color: '#11a0bd',
        '&:after': {
            borderBottom: '2px solid hsl(190,80%,50%)'
        }
    }
  };

function ScoreForm({ gameState,seconds,difficulty,classes,children,className,highScores,fetchHighScores,loggedInUser,userLoggedIn,scoreSubmitted,setScoreSubmitted,setScoreFormOpen,setOpenSnackbar, userScores,setUserScores }){

    const [displayName, setDisplayName] = useState('')

    const handleChange = (event) => {
        setDisplayName(event.target.value)
    }

    const postScore = (data) => {
        fetch(`${backendURL}/scores`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(results => {
                setScoreSubmitted(true)
                checkIfHighScore(results.score[0].time)
            })
    }

    const checkIfHighScore = (time) => {
        const isHighScore = highScores.find(score => time <= score.time)
        if (highScores.length < 10 || isHighScore ){
            fetchHighScores()
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setOpenSnackbar(true)
        setScoreFormOpen(false) 

        const data = {display_name: displayName, time: seconds, difficulty: difficulty}

        postScore(data)
    }
    
    useEffect(() => {
        if (gameState === 'won' && userLoggedIn === true && scoreSubmitted === false){
            const data = {display_name: loggedInUser.display_name, time: seconds, difficulty: difficulty, user_id: loggedInUser.id}
            postScore(data)
            setUserScores([...userScores,seconds])
        }
        return setScoreSubmitted(false)
    },[loggedInUser])

    return (
        <>
        <div className='submit-score'>
            <h3>{userLoggedIn === true ? 'YOUR SCORE' : 'SUBMIT YOUR SCORE'}</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor='display-name'>DISPLAY NAME</label>
            {userLoggedIn === true 
                ? <p>{loggedInUser.display_name}</p>
                : <Input id='display-name' className={clsx(classes.inputRoot, className)} onChange={handleChange} value={displayName} />
            }
            <label>TIME</label>
            <p>{seconds}s</p>
            <label>DIFFICULTY</label>
            <p>{difficulty}</p>
            {userLoggedIn === true ? null : <Button type='submit' className={clsx(classes.buttonRoot, className)}>Submit</Button>}
            </form>
        </div>
        </>
    )
}

ScoreForm.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  };
  
  export default withStyles(styles)(ScoreForm);