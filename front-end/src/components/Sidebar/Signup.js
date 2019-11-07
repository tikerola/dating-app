import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { theme } from '../../theme/theme'
import useField from '../../hooks/useField'
import signupService from '../../services/user'
import { signup } from '../../actions/user'
import { connect } from 'react-redux'

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
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    width: '90%',
    height: '95%',
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
    background: theme.textFieldBackgroundColor,
    marginBottom: '10px'
  },
  cssLabel: {
    color: theme.inputLabelColor
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.inputFocusedBorderColor} !important`,
    },
    color: 'white'
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
  },
  register: {
    width: '90%',
    height: '10%',
    margin: '10px',
    color: theme.signupHeaderColor,
    fontSize: '1em',
    textAlign: 'left',
    '& p': {
      color: 'white',
      fontSize: '1.3em',
      cursor: 'pointer'
    }
  }
})

const Signup = props => {

  const [username, resetUsername] = useField('text')
  const [gender, resetGender] = useField('text')
  const [age, resetAge] = useField('text', /\D|\d{3}/)
  const [password, resetPassword] = useField('password')
  const [confirmPassword, resetConfirmPassword] = useField('password')
  
  const classes = useStyles()

  const handleSubmit = async e => {
    e.preventDefault()
    

    const response = await signupService.signup({
      username: username.value,
      password: password.value,
      age: +age.value,
      gender: gender.value
    })

    props.signup(response)

    resetUsername()
    resetGender()
    resetAge()
    resetPassword()
    resetConfirmPassword()
    props.toggleRegister()
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
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

        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
          Submit
        </Button>

        <div className={classes.register}>
        Have already an account?
        <p className={classes.link} onClick={props.toggleRegister}>Login here</p>
      </div>

      </div>
      
    </div>
  )
}

const mapDispatchToProps = {
  signup
}

export default connect(null, mapDispatchToProps)(Signup)