import React, { useState, useRef, useEffect } from 'react'
import { styled, makeStyles } from '@material-ui/styles'
import { TextField, MenuItem } from '@material-ui/core'
import useField from '../../../hooks/useField'
import { Button } from '@material-ui/core'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import { connect } from 'react-redux'
import { sendChatMessage } from '../../../actions/chat'
import { withRouter } from 'react-router-dom'
import { closeChat } from '../../../actions/chat'
import { theme } from '../../../theme/theme'


const ChatWindowMax = styled('div')({
  width: '350px',
  height: '400px',
  backgroundColor: 'blue',
  color: '#fff',
  textAlign: 'center',
  borderRadius: '5px',
  position: 'fixed',
  zIndex: 50,
  right: '5%',
  bottom: '40px',
  fontSize: '17px',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)'
})

const ChatWindowMin = styled('div')({
  width: '350px',
  backgroundColor: '#1769aa',
  color: '#fff',
  textAlign: 'center',
  borderRadius: '5px',
  paddingTop: '10px',
  paddingBottom: '10px',
  position: 'fixed',
  zIndex: 50,
  right: '5%',
  bottom: '30px',
  fontSize: '17px',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around'
})

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%'
  },
  navigation: {
    height: '12%',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '5px',
    marginBottom: '3%'

  },
  body: {
    height: '88%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
    
  },
  text: {
    width: '100%',
    height: '85%',
    overflow: 'auto',
    color: 'white',
    borderRadius: '5px'
  },
  inputContainer: {
    height: '12%',
    width: '100%',
    padding: 0,
    borderRadius: '5px',
    marginTop: '3%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'

  },
  input: {
    width: '100%',
    borderRadius: '5px',
    padding: '10px',
    borderStyle: 'none'
  },
  left: {
    width: '95%',
    paddingLeft: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left'
    
  },
  right: {
    width: '95%',
    paddingRight: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  li: {
    maxWidth: '60%', 
    padding: '5px',
    marginTop: '10px',
    marginBottom: '10px',
    borderRadius: '5px'
  },
  button: {
    fontSize: '0.5em',
    color: '#aaa'
  },
  textField: {
    width: '180px'
  },
  cssLabel: {
    color: theme.inputLabelColor,
    fontSize: '0.7em',
    
  },

  cssOutlinedInput: {
    '&$cssFocused': {
      borderColor: `${theme.inputFocusedBorderColor} !important`
    },
    
    color: 'white',
    fontSize: '0.8em'
  },
  cssFocused: {
    color: `${theme.inputFocusedLabelColor} !important`
  },
  icon: {
    backgroundColor: 'white'
  },
  
})

const Chat = ({ sendChatMessage, username, closeChat, chatWith, sessions }) => {

  const [maximized, setMaximized] = useState(false)
  const [message, clearMessage] = useField('text')
  const [ selectedPerson ] = useField('text', undefined, chatWith)

  const messagesRef = useRef()

  const classes = useStyles()

  const scrollToBottom = () => {
    if (messagesRef.current)
      messagesRef.current.scrollIntoView({ behavior: 'smooth'})
  }

  useEffect(() => {
    scrollToBottom()
  })

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      sendChatMessage(username, chatWith[0], message.value)
      clearMessage()
    }
  }

  if (!maximized)
    return <ChatWindowMin>
      <Button
        size="small"
        className={classes.button}
        onClick={() => setMaximized(true)}
      >
        Open
        </Button>
        <TextField
          select
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{ 
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused
            }
          }}
          className={classes.textField}
          label="Chat with..."
          {...selectedPerson}
        >
          {chatWith.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>))}

        </TextField>
      <Button
        size="small"
        className={classes.button}
        onClick={() => closeChat()}
      >
        close
        </Button>
    </ChatWindowMin>

  return (
    <ChatWindowMax>
      <div className={classes.root}>
        <div className={classes.navigation}>
          { selectedPerson.value }
          
          <ArrowDropDown onClick={() => setMaximized(false)}>minimize</ArrowDropDown>
        </div>
        <div className={classes.body}>
          <div className={classes.text}>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0, width: '100%' }} >
              {selectedPerson.value && sessions[selectedPerson.value].messages.map((message, index) =>
                <div key={index} className={message.includes('You: ') ? classes.right : classes.left}>
                  <li className={classes.li} style={{ background: message.includes('You: ') ? 'light-blue' : 'purple' }} >{message}</li>
                </div>)
              }
              {chatWith && <div ref={messagesRef}></div>}
            </ul>
            
          </div>
          <div className={classes.inputContainer}>
            <input {...message} onKeyUp={handleKeyUp} className={classes.input} placeholder="write something..." />
          </div>
        </div>
      </div>
    </ChatWindowMax>
  )
}

const mapStateToProps = state => {

  return {
    username: state.user.username,
    chatWith: Object.keys(state.chat.sessions),
    sessions: state.chat.sessions
  }
}

export default connect(mapStateToProps, { sendChatMessage, closeChat })(withRouter(Chat))