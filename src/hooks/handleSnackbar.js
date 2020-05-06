import React, { useState } from 'react'

export default function useHandleSnackbar(){
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState('success')
    const [alertMessage, setAlertMessage] = useState('')

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnackbar(false);
    }
    
    return [openSnackbar,setOpenSnackbar,handleClose,alertSeverity,setAlertSeverity,alertMessage,setAlertMessage]
}
