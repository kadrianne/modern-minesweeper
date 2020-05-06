import React from 'react'
import Button from '@material-ui/core/Button'
import AccountForm from './AccountForm'
import useHandleDialog from '../hooks/handleDialog'

export default function UserContainer(){
    const [openRegisterForm, handleRegisterClick, handleRegisterClose] = useHandleDialog()
    const [openLoginForm, handleLoginClick, handleLoginClose] = useHandleDialog()

    return (
        <>
        <section className='user-container'>
            <Button className='mui-button' variant="outlined" color="primary" onClick={handleLoginClick}>
                LOGIN
            </Button>
            <p>OR</p>
            <Button variant="outlined" color="primary" onClick={handleRegisterClick}>
                REGISTER
            </Button>
            <p>TO VIEW AND SAVE YOUR SCORES</p>
        </section>
        <AccountForm title='REGISTER' content='Create an account.' open={openRegisterForm} handleClose={handleRegisterClose} />
        <AccountForm title='LOGIN' content='Login to save and view your scores.' open={openLoginForm} handleClose={handleLoginClose} />
        </>
    )
}