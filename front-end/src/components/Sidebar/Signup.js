import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { theme } from '../../theme/theme'
import useField from '../../hooks/useField'
import signupService from '../../services/user'
import { signup } from '../../actions/user'
import { setNotification } from '../../actions/notification'
import { connect } from 'react-redux'
import moment from 'moment'


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
  const [birthday, setBirthday] = React.useState('')
  const [password, resetPassword] = useField('password')
  const [confirmPassword, resetConfirmPassword] = useField('password')

  const classes = useStyles()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!inputValid())
      return

    const response = await signupService.signup({
      username: username.value,
      password: password.value,
      age: moment().diff(birthday, 'years'),
      gender: gender.value,
      birthday
    })

    props.signup(response)

    resetUsername()
    resetGender()
    resetPassword()
    resetConfirmPassword()
    props.toggleRegister()
  }

  const inputValid = () => {


    if (!username.value || !birthday || !gender.value || !password.value || !confirmPassword.value) {
      props.setNotification('All fields must be filled')
      return false
    }

    if (password.value !== confirmPassword.value) {
      props.setNotification('Passwords wont match')
      return false
    }

    if (password.value.length < 6) {
      props.setNotification('Password must be at least 6 characters')
      return false
    }

    if (username.value.length < 4) {
      props.setNotification('Username must be at least 4 characters')
      return false
    }
    const calculatedAge = moment().diff(birthday, 'years')

    if (calculatedAge < 18 || calculatedAge > 99) {
      props.setNotification('Age must be between 18 and 99')
      return false
    }

    return true
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h1>Sign Up</h1>
        </div>

        <input type="password" style={{ display: 'none' }} readOnly={true} autoComplete="new-password"></input>

        <TextField
          {...username}
          margin="dense"
          required
          className={classes.textField}
          label="Username"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
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
          margin="dense"
          required
          className={classes.textField}
          label="Gender"
          {...gender}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
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
          type="date"

          value={birthday}
          onChange={e => setBirthday(e.target.value)}
          margin="dense"
          required
          label="Date of Birth"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
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
          margin="dense"
          required
          label="Password"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
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
          margin="dense"
          required
          label="Confirm password"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
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

        <Button variant="contained" size="small" color="primary" className={classes.button} onClick={handleSubmit}>
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
  signup,
  setNotification
}

export default connect(null, mapDispatchToProps)(Signup)