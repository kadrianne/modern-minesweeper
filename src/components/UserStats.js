import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Alert from './Alert'
import useHandleSnackbar from '../hooks/handleSnackbar'

const backendURL = `http://localhost:4000`

export default function UserStats({ difficulty, gameState }){

    const dispatch = useDispatch()
    const userLoggedIn = useSelector(state => state.userLoggedIn)
    const loggedInUser = useSelector(state => state.loggedInUser)
    const userScores = useSelector(state => state.userScores)
    const scoreFormOpen = useSelector(state => state.scoreFormOpen)
    const [fastestTime, setFastestTime] = useState(0)
    const [averageTime, setAverageTime] = useState(0)
    const [openSnackbar,setOpenSnackbar,handleClose] = useHandleSnackbar()

    const getFastestTime = () => setFastestTime(Math.min(...userScores))
    const getAverageTime = () => setAverageTime(Math.round(userScores.reduce((acc,score) => acc + score,0) / userScores.length))

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

    const logout = () => {
        dispatch({type: 'LOG_OUT'})
    }

    useEffect(() => {
        if (userLoggedIn === true){
            setOpenSnackbar(true)
            if (scoreFormOpen === false){
                getUsersScores()
            }
        }
    },[userLoggedIn])

    useEffect(() => {
        if (userScores.length > 0){
            getFastestTime()
            getAverageTime()
        }
    },[userScores])

    return (
        <>
        <section className='user-stats'>
            <h3>{`${loggedInUser.display_name}`.toUpperCase()}'S STATS</h3>
            <h4>DIFFICULTY: {difficulty.toUpperCase()}</h4>
            <ul>
                <li>Fastest Time ≫ <span className='stat'>{userScores.length === 0 ? 'N/A' : `${fastestTime}s`}</span></li>
                <li>Average Time ≫ <span className='stat'>{userScores.length === 0 ? 'N/A' : `${averageTime}s`}</span></li>
                <li>Games Won ≫ <span className='stat'>{userScores.length}</span></li>
            </ul>
            <p className='login-text'>{`LOGGED IN AS ${loggedInUser.username}`.toUpperCase()}</p> 
            <Button variant="outlined" color="primary" onClick={logout}>
                LOGOUT
            </Button>
        </section>
        <Alert message='User successfully logged in.' severity='success' handleClose={handleClose} openSnackbar={openSnackbar} />
        </>
    )
}