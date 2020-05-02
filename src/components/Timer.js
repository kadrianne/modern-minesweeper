import React, { useState,useEffect } from 'react'

export default function Timer(props){

    return (
        <div class='timer'>⏱ {props.seconds}</div>
    )
}