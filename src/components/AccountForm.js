import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from './Alert'
import useHandleSnackbar from '../hooks/handleSnackbar'

export default function AccountForm({ title,content,open,handleClose,handleSubmit }) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (event) => setUsername(event.target.value)
  const handleDisplayName = (event) => setDisplayName(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  const resetForm = () => {
    setUsername('')
    setDisplayName('')
    setPassword('')
  }

  return (
    <>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={(event) => {
        resetForm()
        handleSubmit(event,username,password,displayName)
      }}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                type="text"
                onChange={handleUsername}
                value={username}
                fullWidth
            />
            {title === 'REGISTER' ? <TextField
                autoFocus
                margin="dense"
                id="display-name"
                label="Display Name"
                type="text"
                onChange={handleDisplayName}
                value={displayName}
                fullWidth
            /> : null}
            <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                onChange={handlePassword}
                value={password}
                fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button type='submit' color="primary">
            {title}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
    </>
  )
}
