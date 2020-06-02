import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import AccountContainer from './AccountContainer'
import UserStats from './UserStats'
import Alert from './Alert'
import useHandleSnackbar from '../hooks/handleSnackbar'

export default function UserContainer({ difficulty,setScoreFormOpen,userScores,setUserScores }){

    const userLoggedIn = useSelector(state => state.userLoggedIn)
    // const [userLoggedOut, setUserLoggedOut] = useState(false)
    const [openSnackbar,setOpenSnackbar,handleClose] = useHandleSnackbar()

    useEffect(() => {
        if (userLoggedIn === false){
            setOpenSnackbar(true)
            setScoreFormOpen(false)
        }
    },[userLoggedIn])

    return (
        <>
        {userLoggedIn === false
        ? <AccountContainer /> 
        : <UserStats difficulty={difficulty} userScores={userScores} setUserScores={setUserScores} />
        }
        {userLoggedIn === false ? <Alert message='User successfully logged out.' severity='success' handleClose={handleClose} openSnackbar={openSnackbar} /> : null}
        </>
    )
}