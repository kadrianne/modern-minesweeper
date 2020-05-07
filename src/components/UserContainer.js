import React, { useState } from 'react'
import AccountContainer from './AccountContainer'
import UserStats from './UserStats'

const backendURL = 'http://localhost:4000'

export default function UserContainer({ difficulty }){
    const [userLoggedIn, setUserLoggedIn] = useState(true)
    const [loggedInUser, setLoggedInUser] = useState({})

    return (
        <>
        {userLoggedIn === false
        ? <AccountContainer setUserLoggedIn={setUserLoggedIn} setLoggedInUser={setLoggedInUser} /> 
        : <UserStats difficulty={difficulty} loggedInUser={loggedInUser} />
        }
        </>
    )
}