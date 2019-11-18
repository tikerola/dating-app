import React from 'react'
import useField from '../../hooks/useField'
import { makeStyles } from '@material-ui/styles'
import { TextField, Button } from '@material-ui/core'
import { theme } from '../../theme/theme'
import { connect } from 'react-redux'
import { reply } from '../../actions/mail'

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
  buttonContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: '10px',
    marginRight: '30px',
    width: '100px'
  }

})

const ReplyMailForm = ({ match, history, reply, recipient }) => {

  const [text, clearText] = useField('text')

  const classes = useStyles()

  if (!recipient)
    return <div></div>

  return <div className={classes.root}>
    <h1>Reply to: {recipient.author} </h1>
    <TextField
      id="outlined-multiline-static"
      label="Reply"
      {...text}
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
    <div className={classes.buttonContainer}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          history.goBack()
        }}
        className={classes.button}
      >
        Cancel
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          reply(match.params.id, text.value)
          clearText()
          history.push('/profile')
        }}
        className={classes.button}
      >
        Send
      </Button>
    </div>
  </div>
}

const mapStateToProps = (state, ownProps) => {
  return {
    recipient: state.mail.inbox.find(m => m.id === ownProps.match.params.id)
  }
}

export default connect(mapStateToProps, { reply })(ReplyMailForm)