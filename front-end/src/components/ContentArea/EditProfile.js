import React from 'react'
import useField from '../../hooks/useField'
import { makeStyles } from '@material-ui/styles'
import { TextField, Button } from '@material-ui/core'
import { theme } from '../../theme/theme'
import { connect } from 'react-redux'
import { editProfileText } from '../../actions/user'

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

const EditProfile = ({ history, editProfileText, oldText }) => {

  const [text, clearText] = useField('text', undefined, oldText)

  const classes = useStyles()

  if (!oldText)
    return <div></div>

  return <div className={classes.root}>
    <h1>Edit profile text</h1>
    <TextField
      id="outlined-multiline-static"
      
      label="Edit"
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

    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        editProfileText(text.value)
        clearText()
        history.push('/profile')
      }}
      className={classes.button}
    >
      Send
      </Button>
  </div>
}

const mapStateToProps = (state) => {
  return {
    oldText: state.user.profile.profileText
  }
}

export default connect(mapStateToProps, { editProfileText })(EditProfile)