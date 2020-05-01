import React, {useState} from 'react'

export default function FlagCounter(props){

    const totalMines = {
        'easy': 10
    }

    const [flagsLeft, setFlags] = useState(totalMines[props.difficulty])

    return (
        <div class='flag-counter'>
            ❗️ {flagsLeft - props.flagsMarked}
        </div>
    )
}