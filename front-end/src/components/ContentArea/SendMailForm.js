import React from 'react'
import useField from '../../hooks/useField'
import { makeStyles } from '@material-ui/styles'
import { TextField, Button } from '@material-ui/core'
import { theme } from '../../theme/theme'
import { connect } from 'react-redux'
import { sendMail } from '../../actions/mail'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#bbb'
  },
  textField: {
    width: '80%',
    background: 'rgba(0, 0, 0, 0.5)'
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
    marginTop: '30px',
    marginLeft: 'auto',
    marginRight: '10%',
    width: '175px'
  }

})

const SendMailForm = ({ match, history, sendMail }) => {

  const [content, clearContent] = useField('text')
  const [title, clearTitle] = useField('text')

  const classes = useStyles()

  return <div className={classes.root}>
    <h1>Send Mail To: {match.params.username} </h1>

    <TextField
          {...title}
          className={classes.textField}
          label="Title"
          margin="normal"
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
      id="outlined-multiline-static"
      label="Reply"
      {...content}
      multiline
      rows="7"
      className={classes.textField}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
        }
      }}
      InputProps={{
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
        }
      }}
    />

    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        sendMail(match.params.username, title.value, content.value)
        clearContent()
        clearTitle()
        history.push('/profile')
      }}
      className={classes.button}
    >
      Send
      </Button>
  </div>
}

export default connect(null, { sendMail })(SendMailForm)