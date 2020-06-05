import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AccountContainer from './AccountContainer'
import UserStats from './UserStats'
import Alert from './Alert'
import useHandleSnackbar from '../hooks/handleSnackbar'

export default function UserContainer({ difficulty,gameState }){

    const userLoggedIn = useSelector(state => state.userLoggedIn)
    const userLoggedOut = useSelector(state => state.userLoggedOut)
    const [openSnackbar,setOpenSnackbar,handleClose] = useHandleSnackbar()

    useEffect(() => {
        if (userLoggedOut === true){
            setOpenSnackbar(true)
        }
    },[userLoggedOut])

    return (
        <>
        {userLoggedIn === false
        ? <AccountContainer /> 
        : <UserStats difficulty={difficulty} gameState={gameState} />
        }
        {userLoggedIn === false ? <Alert message='User successfully logged out.' severity='success' handleClose={handleClose} openSnackbar={openSnackbar} /> : null}
        </>
    )
}