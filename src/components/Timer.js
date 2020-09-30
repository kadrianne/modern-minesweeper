import React from 'react'
import Twemoji from 'react-twemoji'

export default function Timer(props){

    return (
        <div className='timer'><Twemoji options={{ className: 'emoji' }}><span>⏱</span></Twemoji>{props.seconds}</div>
    )
}