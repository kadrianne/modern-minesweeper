import React, { useState,useEffect } from 'react'

const backendURL = `http://localhost:4000`

export default function UserStats({ difficulty,loggedInUser }){

    const [userScores, setUserScores] = useState([])

    const getFastestTime = () => {
        return Math.min(...userScores)
    }

    const getAverageTime = () => {
        return Math.round(userScores.reduce((acc,score) => acc + score,0) / userScores.length)
    }

    const getUsersScores = () => {
        fetch(`${backendURL}/users/scores`, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then(response => response.json())
            .then(user => setUserScores(user.scores.map(score => score.time)))
    }

    useEffect(() => {
        getUsersScores()
    },[])

    return (
        <section className='user-stats'>
            <h3>{`${loggedInUser.username}`.toUpperCase()}'S STATS</h3>
            <h4>DIFFICULTY: {difficulty.toUpperCase()}</h4>
            <ul>
                <li>Fastest Time ≫≫ <span class='stat'>{getFastestTime()}s</span></li>
                <li>Average Time ≫≫ <span class='stat'>{getAverageTime()}s</span></li>
                <li>Games Won ≫≫ <span class='stat'>{userScores.length}</span></li>
            </ul>
        </section>
    )
}