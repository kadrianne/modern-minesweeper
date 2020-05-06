import React from 'react'
import Button from '@material-ui/core/Button'
import AccountForm from './AccountForm'
import useHandleDialog from '../hooks/handleDialog'

const backendURL = 'http://localhost:4000'

export default function UserContainer(){
    const [openRegisterForm, handleRegisterClick, handleRegisterClose] = useHandleDialog()
    const [openLoginForm, handleLoginClick, handleLoginClose] = useHandleDialog()

    const createUser = (data) => {
        fetch(`${backendURL}/users`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    const handleRegisterSubmit = (event,username,password,display_name) => {
        event.preventDefault()

        const formData = {username,password,display_name}

        createUser(formData)
      }

    const handleLoginSubmit = (event,username,password) => {
        event.preventDefault()

        const formData = {username,password}
        
    }

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
        <AccountForm title='REGISTER' content='Create an account.' open={openRegisterForm} handleClose={handleRegisterClose} handleSubmit={handleRegisterSubmit} />
        <AccountForm title='LOGIN' content='Login to save and view your scores.' open={openLoginForm} handleClose={handleLoginClose} handleSubmit={handleLoginSubmit} />
        </>
    )
}