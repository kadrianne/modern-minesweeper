import React, { useState,useEffect } from 'react'

export default function Timer(props){

    return (
        <div className='timer'>⏱ {props.seconds}</div>
    )
}