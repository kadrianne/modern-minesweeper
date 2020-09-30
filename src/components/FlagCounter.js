import React from 'react'
import Twemoji from 'react-twemoji'

export default function FlagCounter({ difficulty,flagsMarked}){

    const totalMines = {
        'Easy': 10
    }

    return (
        <div className='flag-counter'>
            <Twemoji options={{ className: 'emoji' }}><span>🚩</span></Twemoji> { totalMines[difficulty] - flagsMarked }
        </div>
    )
}