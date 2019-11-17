import React, { useEffect } from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { connect } from 'react-redux'
import { logout } from '../../actions/user'
import { withRouter } from 'react-router-dom'
import { receiveChatMessage } from '../../actions/chat'
import { socket } from '../../index'
import { setNotification } from '../../actions/notification'
import Chat from '../ContentArea/chat/Chat'

const useStyles = makeStyles({
  root: {
    width: '96.4%',
    height: '10%',
    padding: '10px',
    margin: '15px auto',
    backgroundColor: theme.navigationBackgound,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '2px solid #bbb'
  },
  loggedInContainer: {
    color: '#bbb',
    fontSize: '1.3em',
    marginRight: '15px',
    width: '30%'
  },
  loggedIn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  username: {
    color: 'white'
  }
})

const Navigation = props => {

  const { username, loggedIn, logout, setNotification, history, receiveChatMessage, chatOpen } = props
  
  const classes = useStyles()

  useEffect(() => {
    socket.on('mail', data => {
      if (data.receiver === username) {
        setNotification(`${data.mail.author} sent you mail`)
      }
      else if (data.author === username) {
        setNotification(`You sent mail to ${data.mail.receiver}`)
      }
      console.log('paskaa')
    })
  }, [setNotification, username])

  useEffect(() => {
    
    if (username)
      socket.emit('newUser', username)
    
    
    socket.on('chat', data => {
      if (data.to === username) {
        console.log(data, '***********')
        receiveChatMessage(data.from, data.message) 
      }
    })

    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        
        socket.connect();
      }
      
    })

  }, [username, receiveChatMessage])

  

  const handleLogout = () => {
    history.push('/')
    logout()

  }

  return <Paper className={classes.root} elevation={5}>
    <img src='/assets/images/title.png' alt='title' />
    <div className={classes.loggedInContainer}>
      {
        loggedIn
          ?
          <div className={classes.loggedIn}><p>Logged in: <span className={classes.username}>{username}</span></p>
            <img src="/assets/images/boygirl.png" width='130' alt='face' />
            <Button color='primary' size='small' onClick={handleLogout}>Log out</Button></div>
          :
          ''
      }

      { chatOpen && <Chat />}
    </div>

  </Paper>
}

const mapStateToProps = state => ({
  username: state.user.username,
  loggedIn: state.user.loggedIn,
  chatOpen: state.chat.chatOpen
})

const mapDispatchToProps = ({
  logout,
  setNotification,
  receiveChatMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))
