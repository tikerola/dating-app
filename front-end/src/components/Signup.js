import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { theme } from '../theme/theme'
import useField from '../hooks/useField'

const genders = [
  {
    value: '',
    label: 'Gender'
  },
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
]

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    width: '90%',
    height: '90%',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  header: {
    width: '100%',
    textAlign: 'center',
    color: theme.signupHeaderColor
  },
  textField: {
    color: theme.inputTextColor,
    background: theme.textFieldBackgroundColor
  },
  cssLabel: {
    color: theme.inputLabelColor
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.inputFocusedBorderColor} !important`,
    },
    color: 'white',
    //boxShadow: '0 0 10px 0px black'
  },

  cssFocused: {
    color: `${theme.inputFocusedLabelColor} !important`
  },
  icon: {
    backgroundColor: 'inherit'
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: `${theme.inputBorderColor} !important`
  },
  button: {
    width: '50%',
    margin: '20px auto'
  }
})

const Signup = props => {

  const [username, resetUsername] = useField('text')
  const [gender, setGender] = useField('text')
  const [age, resetAge] = useField('text', /\D|\d{3}/)
  const [password, resetPassword] = useField('password')
  const [confirmPassword, resetConfirmPassword] = useField('password')
  
  

  const classes = useStyles()

  return (
    <div className={classes.root}>


      <form className={classes.container}>
        <div className={classes.header}>
          <h1>Sign Up</h1>
        </div>

        <input type="password" style={{display:'none'}} readOnly={true} autoComplete="new-password"></input>

        <TextField
          {...username}
          className={classes.textField}
          label="Username"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            }
          }}
        />

        <TextField
          select
          className={classes.textField}
          label="Gender"
          {...gender}
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{ 
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            }
          }}
        >
          {genders.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>))}

        </TextField>


        <TextField
          
          className={classes.textField}
          {...age}
          label="Age"
          
          variant="outlined"
          InputLabelProps={{ 
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline
            }
          }}
        />


        <TextField
          
          className={classes.textField}
          {...password}
          
          label="Password"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            }
          }}
        />


        <TextField
          
          className={classes.textField}
          {...confirmPassword}
          label="Confirm password"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            }
          }}
        />

        <Button variant="contained" color="primary" className={classes.button}>
          Submit
        </Button>

      </form>
    </div>
  )
}

export default Signup