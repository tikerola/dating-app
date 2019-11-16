import React, { useState } from 'react'
import { styled, makeStyles } from '@material-ui/styles'
import useField from '../../../hooks/useField'
import { Button } from '@material-ui/core'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import { connect } from 'react-redux'
import { sendChatMessage } from '../../../actions/chat'
import { withRouter } from 'react-router-dom'
import { closeChat } from '../../../actions/chat'

const ChatWindowMax = styled('div')({
  width: '300px',
  height: '400px',
  backgroundColor: '#1769aa',
  color: '#fff',
  textAlign: 'center',
  padding: '1%',
  borderRadius: '5px',
  position: 'fixed',
  zIndex: 50,
  right: '5%',
  bottom: '30px',
  fontSize: '17px',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)'

})

const ChatWindowMin = styled('div')({
  width: '300px',
  backgroundColor: '#1769aa',
  color: '#fff',
  textAlign: 'center',
  borderRadius: '5px',
  padding: '1%',
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
    height: '12%',
    color: 'white',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '2%',
    padding: '5px',
    boxShadow: '0px 0px 13px 0px rgba(0,0,0,0.75)'

  },
  body: {
    height: '84%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingTop: '10px',


  },
  text: {
    height: '85%',
    overflow: 'auto',
    color: 'white',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: '10px'
  },
  inputContainer: {
    height: '15%',
    width: '100%',
    padding: 0,
    borderRadius: '5px',
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    padding: '10px',
    margin: 0,
    width: '92%',
    borderRadius: '5px'
  },
  button: {
    fontSize: '0.5em'
  }
})

const Chat = ({ sendChatMessage, username, closeChat, chatWith, sessions }) => {

  const [maximized, setMaximized] = useState(false)
  const [message, clearMessage] = useField('text')

  const classes = useStyles()

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      sendChatMessage(username, chatWith[0], message.value )
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
      <span>Chat</span>
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
          {chatWith.map((person) => <span key={person}>{person}</span>)}
          <ArrowDropDown onClick={() => setMaximized(false)}>minimize</ArrowDropDown>
        </div>
        <div className={classes.body}>
          <div className={classes.text}>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
              {chatWith && sessions[chatWith].messages.map((message, index) => 
              <li style={{ padding: '10px' }} key={index}>{message}</li>)}
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
    messages: state.chat.messages,
    username: state.user.username,
    chatWith: Object.keys(state.chat.sessions),
    sessions: state.chat.sessions
  }
}

export default connect(mapStateToProps, { sendChatMessage, closeChat })(withRouter(Chat))