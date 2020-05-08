import React, { useState,useEffect } from 'react'
import AccountContainer from './AccountContainer'
import UserStats from './UserStats'
import Alert from './Alert'
import useHandleSnackbar from '../hooks/handleSnackbar'

export default function UserContainer({ difficulty,userLoggedIn,setUserLoggedIn,loggedInUser,setLoggedInUser }){

    const [userLoggedOut, setUserLoggedOut] = useState(false)
    const [openSnackbar,setOpenSnackbar,handleClose] = useHandleSnackbar()

    useEffect(() => {
        if (userLoggedOut === true){
            setOpenSnackbar(true)
        }
    },[userLoggedIn])

    return (
        <>
        {userLoggedIn === false
        ? <AccountContainer setUserLoggedIn={setUserLoggedIn} setLoggedInUser={setLoggedInUser} /> 
        : <UserStats difficulty={difficulty} userLoggedOut={userLoggedOut} setUserLoggedOut={setUserLoggedOut} userLoggedIn={userLoggedIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} setUserLoggedIn={setUserLoggedIn} />
        }
        {userLoggedOut === true ? <Alert message='User successfully logged out.' severity='success' handleClose={handleClose} openSnackbar={openSnackbar} /> : null}
        </>
    )
}