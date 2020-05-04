import React, {useState} from 'react'

export default function FlagCounter(props){

    const totalMines = {
        'Easy': 10
    }

    const [flagsLeft, setFlags] = useState(totalMines[props.difficulty])

    return (
        <div className='flag-counter'>
            ❗️ {flagsLeft - props.flagsMarked}
        </div>
    )
}