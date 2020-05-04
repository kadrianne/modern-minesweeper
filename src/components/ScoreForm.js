import React, { useState } from 'react'
import { FormControl,Button,Input,InputLabel } from '@material-ui/core'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    buttonRoot: {
      background: '#a675cb',
      borderRadius: 1,
      color: '#faf0e6',
      height: 40,
      width: 80,
      margin: 10,
      '&:hover': {
          background: 'hsl(190,80%,50%)',
        }
    },
    inputRoot: {
        '&:after': {
            borderBottom: '2px solid hsl(190,80%,50%)'
        }
    }
  };

function ScoreForm({ seconds,difficulty,classes,children,className }){

    const [displayName, setDisplayName] = useState('')
    const handleChange = (event) => {
        setDisplayName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div className='submit-score'>
            <h3>SUBMIT YOUR SCORE</h3>
            <form>
            <label htmlFor='display-name'>DISPLAY NAME</label>
            <Input id='display-name' className={clsx(classes.inputRoot, className)} onChange={handleChange} placeholder={displayName} name='display_name' />
            <label>TIME</label>
            <p>{seconds}s</p>
            <label>DIFFICULTY</label>
            <p>{difficulty}</p>
            <Button className={clsx(classes.buttonRoot, className)} onSubmit={handleSubmit}>Submit</Button>
            </form>
    </div>
    )
}

ScoreForm.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  };
  
  export default withStyles(styles)(ScoreForm);