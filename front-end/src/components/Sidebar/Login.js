import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { theme } from '../../theme/theme'
import useField from '../../hooks/useField'
import { login } from '../../actions/user'
import { connect } from 'react-redux'
import { setNotification } from '../../actions/notification'


const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '90%',
    height: '90%',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export const Login = props => {

  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')

  const classes = useStyles()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!username.value || !password.value) {
      props.setNotification('You need to provide both values')
      return
    }
    
    props.login({ username: username.value, password: password.value })
   
    resetUsername()
    resetPassword()
  }

  return (
    <div className={classes.root}>
      <form className={classes.container}>
        <div className={classes.header}>
          <h1>Login</h1>
        </div>

        <input type="password" style={{ display: 'none' }} readOnly={true} autoComplete="new-password"></input>

        <TextField
          {...username}
          id="login-username"
          className={classes.textField}
          label="Username"
          margin="normal"
          fullWidth
          required
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
          id="password"
          {...password}
          label="Password"
          margin="normal"
          fullWidth
          required
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

        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit} id="login">
          Login
        </Button>
      </form>
      <div className={classes.register}>
        Don't have an account yet?
        <p className={classes.link} onClick={props.toggleRegister}>Register here</p>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  login,
  setNotification
}

export default connect(null, mapDispatchToProps)(Login)