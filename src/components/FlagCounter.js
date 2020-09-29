import React from 'react'
import flag from '../assets/flag.svg'

export default function FlagCounter({ difficulty,flagsMarked}){

    const totalMines = {
        'Easy': 10
    }

    return (
        <div className='flag-counter'>
            <img className='flag-emoji' src={flag} /> { totalMines[difficulty] - flagsMarked }
        </div>
    )
}