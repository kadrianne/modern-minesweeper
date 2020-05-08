import { useState } from 'react'

export default function useHandleDialog(){
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
    }
    
    return [open,setOpen,handleClick,handleClose]
}
