import React from 'react'
import timer from '../assets/timer.svg'

export default function Timer(props){

    return (
        <div className='timer'><img className='timer-emoji' src={timer} />{props.seconds}</div>
    )
}