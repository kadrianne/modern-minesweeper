import React, { useState,useEffect } from 'react'

export default function Timer(){

    const [seconds,setSeconds] = useState(0)

    return (
        <div class='timer'>⏱ {seconds}</div>
    )
}