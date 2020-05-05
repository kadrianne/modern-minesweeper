import React, { useState, useEffect } from 'react'

export default function ScoreBoard({ highScores,difficulty }){

    const renderHighScores = () => {
        return highScores.map(score => {
            return <li>{score.display_name} - {score.time}s</li>
        })
    }

    return (
        <div class='scoreboard'>
            <h3>HIGH SCORES</h3>
            <h4>DIFFICULTY: {difficulty.toUpperCase()}</h4>
            <ol>
                {renderHighScores()}
            </ol>
        </div>
    )
}