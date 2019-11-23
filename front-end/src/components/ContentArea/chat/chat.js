import React, { useState, useRef, useEffect } from 'react'
import { styled, makeStyles } from '@material-ui/styles'
import { Tooltip } from '@material-ui/core'
import useField from '../../../hooks/useField'
import { Button } from '@material-ui/core'
import MinimizeIcon from '@material-ui/icons/Minimize';
import ClearIcon from '@material-ui/icons/Clear'
import { connect } from 'react-redux'
import { sendChatMessage, setChatWith, setDot, setMaxWindow } from '../../../actions/chat'
import { withRouter } from 'react-router-dom'
import { closeChat } from '../../../actions/chat'
import { theme } from '../../../theme/theme'


const ChatWindowMax = styled('div')({
  width: '322px',
  height: '500px',
  overflow: 'hidden',
  color: '#fff',
  textAlign: 'center',
  borderTopLeftRadius: '50px',
  borderTopRightRadius: '50px',
  borderBottomRightRadius: '5px',
  borderBottomLeftRadius: '5px',
  position: 'fixed',
  zIndex: 50,
  right: '5%',
  bottom: '30px',
  fontSize: '17px',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)',
  backgroundImage: "url('/assets/images/puh1.png')",
})

const ChatWindowMin = styled('div')({
  width: '322px',
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
    width: '100%',

  },
  navigation: {
    height: '20%',
    color: 'white',
    background: 'rgba(25, 25, 250, 0.8)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '25px',


  },
  body: {
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    background: 'rgba(25, 25, 250, 0.8)',

  },
  text: {
    paddingTop: '30px',
    width: '100%',
    height: '85%',
    overflow: 'auto',
    color: 'black',
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
    justifyContent: 'center',

  },
  input: {
    width: '100%',
    borderStyle: 'none',
    padding: '10px',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px'
  },
  left: {
    width: '88%',
    paddingLeft: '12%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    color: 'white'
  },
  right: {
    width: '90%',
    paddingRight: '10%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    textAlign: 'right',
    color: 'white'
  },
  li: {
    maxWidth: '70%',
    padding: '5px',
    marginTop: '10px',
    marginBottom: '10px',
    borderRadius: '5px'
  },
  button: {
    fontSize: '0.6em',
    color: '#aaa',
    padding: 0
  },
  textField: {
    width: '180px',

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
  icons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '25px'

  }

})

const Chat = ({ sendChatMessage, username, closeChat, candidates, sessions, chatWith, setDot, setMaxWindow }) => {

  const [maximized, setMaximized] = useState(false)
  const [message, clearMessage] = useField('text')

  const messagesRef = useRef()

  const classes = useStyles()

  const scrollToBottom = () => {
    if (messagesRef.current)
      messagesRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  })

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      sendChatMessage(username, chatWith, message.value)
      clearMessage()
    }
  }

  if (!maximized)
    return <ChatWindowMin>
      {
        !chatWith ?
          <Tooltip className={classes.link} title={<>
          <p>You need to have a person selected to be able to chat</p>
          <p>Add people from their profile page</p>
          </>} placement="top">
            <Button
              size="small"
              className={classes.button}
            >
              Open
            </Button>
          </Tooltip>
          :
          <Button
            size="small"
            className={classes.button}
            onClick={() => {
              setMaximized(true)
              setDot(chatWith, 0)
              setMaxWindow(true)
            }}
          >
            Open
      </Button>
      }

      {/* <TextField
        select
        disabled={candidates.length === 0}
        variant="outlined"
        margin="dense"
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
        onChange={handleOnChange}
        value={selectedPerson}
      >
        {candidates.map(name => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>))}

      </TextField> */}

      CHAT

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
          {chatWith}

          <div className={classes.icons}>
            <MinimizeIcon
              fontSize="small"
              style={{ paddingRight: '10px', cursor: 'pointer' }}
              onClick={() => {
                setMaximized(false)
                setMaxWindow(false)
              }}
            />
            <ClearIcon
              fontSize="small"
              onClick={() => {
                closeChat()
                setMaxWindow(false)
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>

        </div>
        <div className={classes.body}>
          <div className={classes.text}>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0, width: '100%' }} >
              {chatWith && sessions[chatWith].messages.map((message, index) =>
                <div key={index} className={message.includes('You: ') ? classes.right : classes.left}>
                  <li className={classes.li} 
                  style={{ background: message.includes('You: ') ? 'blue' : 'purple' }} >{message}</li>
                </div>)
              }
              {candidates && <div ref={messagesRef}></div>}
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
    candidates: Object.keys(state.chat.sessions),
    sessions: state.chat.sessions,
    chatWith: state.chat.chatWith
  }
}

export default connect(mapStateToProps, { sendChatMessage, closeChat, setChatWith, setDot, setMaxWindow })(withRouter(Chat))