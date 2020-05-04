import React from 'react'
import { FormControl,Input,FormHelperText,InputLabel } from '@material-ui/core'

export default function ScoreForm(){

    const handleSubmit = () => {

    }

    return (
        <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
    )
}
