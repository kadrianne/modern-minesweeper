import React from 'react'
import Button from '@material-ui/core/Button'
import AccountForm from './AccountForm'
import Alert from './Alert'
import useHandleDialog from '../hooks/handleDialog'
import useHandleSnackbar from '../hooks/handleSnackbar'

const backendURL = 'http://localhost:4000'

export default function UserContainer(){
    const [openRegisterForm,setOpenRegisterForm,handleRegisterClick,handleRegisterClose] = useHandleDialog()
    const [openLoginForm,setOpenLoginForm,handleLoginClick,handleLoginClose] = useHandleDialog()
    const [
        openSnackbar,
        setOpenSnackbar, 
        handleSnackbarClose, 
        alertSeverity, 
        setAlertSeverity,
        alertMessage,
        setAlertMessage
    ] = useHandleSnackbar(false)

    const handleResponse = (response) => {
        if (response.status === 201){
            setAlertSeverity('success')
            setAlertMessage('User successfully created.')
            setOpenSnackbar(true)
            setOpenRegisterForm(false)
        } else if (response.status === 409){
            setAlertSeverity('error')
            setAlertMessage(response.message)
            setOpenSnackbar(true)
        }
    }

    const createUser = (data) => {
        fetch(`${backendURL}/users`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(handleResponse)
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
        <Alert message={alertMessage} severity={alertSeverity} handleClose={handleSnackbarClose} openSnackbar={openSnackbar} />
        </>
    )
}