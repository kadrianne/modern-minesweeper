import React from 'react'

export default function FlagCounter({ difficulty,flagsMarked}){

    const totalMines = {
        'Easy': 10
    }

    return (
        <div className='flag-counter'>
            <span>❗️</span> { totalMines[difficulty] - flagsMarked }
        </div>
    )
}