import React from 'react'
import Button from '@material-ui/core/Button'
import CreateAccountForm from './CreateAccountForm'

export default function UserContainer({ handleRegisterClose,handleRegisterClick,openCreateAccountForm }){
    return (
        <>
        <section className='user-container'>
            <Button className='mui-button' variant="outlined" color="primary" onClick={handleRegisterClick}>
                LOGIN
            </Button>
            <p>OR</p>
            <Button variant="outlined" color="primary" onClick={handleRegisterClick}>
                REGISTER
            </Button>
            <p>TO VIEW AND SAVE YOUR SCORES</p>
        </section>
        <CreateAccountForm open={openCreateAccountForm} handleClose={handleRegisterClose} />
        </>
    )
}