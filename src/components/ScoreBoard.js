import React from 'react'

export default function ScoreBoard({ highScores,difficulty }){

    const renderHighScores = () => {
        return highScores.map(score => {
            return <li>{score.display_name} ≫ <span className='stat'>{score.time}s</span></li>
        })
    }

    return (
        <div className='scoreboard'>
            <h3>HIGH SCORES</h3>
            <h4>DIFFICULTY: {difficulty.toUpperCase()}</h4>
            <ol>
                {renderHighScores()}
            </ol>
        </div>
    )
}