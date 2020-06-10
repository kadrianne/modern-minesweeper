import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Input } from '@material-ui/core'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'

const backendURL = 'https://minesweeper-backend.herokuapp.com'
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
}

function ScoreForm({ seconds,difficulty,classes,className,highScores,fetchHighScores,setOpenSnackbar }){

    const dispatch = useDispatch()
    const [displayName, setDisplayName] = useState('')
    const userLoggedIn = useSelector(state => state.userLoggedIn)
    const loggedInUser = useSelector(state => state.loggedInUser)

    const handleChange = (event) => {
        setDisplayName(event.target.value)
    }

    const checkIfHighScore = (time) => {
        const isHighScore = highScores.find(score => time <= score.time)
        if (highScores.length < 10 || isHighScore ){
            fetchHighScores()
        }
    }

    const getUsersScores = () => {
        fetch(`${backendURL}/users/scores`, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then(response => response.json())
            .then(user => dispatch({ type: 'SET_SCORES', scores: user.scores.map(score => score.time) }))
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
                checkIfHighScore(results.score[0].time)
                if (userLoggedIn === true){
                    getUsersScores()
                }
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setOpenSnackbar(true)
        dispatch({ type: 'CLOSE_FORM' })

        const data = {display_name: displayName, time: seconds, difficulty: difficulty}

        postScore(data)
    }
    
    useEffect(() => {
        if (userLoggedIn === true){
            const data = {display_name: loggedInUser.display_name, time: seconds, difficulty: difficulty, user_id: loggedInUser.id}
            postScore(data)
        }
    },[userLoggedIn])

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
}

export default withStyles(styles)(ScoreForm)