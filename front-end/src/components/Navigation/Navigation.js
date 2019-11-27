/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { connect } from 'react-redux'
import { logout, addToFavorites, beingBlocked } from '../../actions/user'
import { withRouter } from 'react-router-dom'
import { receiveChatMessage, destroySession } from '../../actions/chat'
import { socket } from '../../index'
import { setNotification } from '../../actions/notification'
import { mailUnread } from '../../actions/mail'
import Chat from '../ContentArea/chat/Chat'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ChatButtons from '../ContentArea/chat/ChatButtons'

const useStyles = makeStyles({
  root: {
    width: '96.4%',
    height: '10%',
    padding: '10px',
    margin: '1% auto',
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
    width: '35%'
  },
  loggedIn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  username: {
    color: 'white'
  },
  iconAndText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

const Navigation = props => {

  const { username,
    loggedIn,
    logout,
    setNotification,
    history,
    receiveChatMessage,
    chatOpen,
    mailUnread,
    addToFavorites,
    beingBlocked,
    destroySession
  } = props

  const classes = useStyles()

  useEffect(() => {
    socket.on('mail', data => {
      if (data.receiver === username) {
        setNotification(`${data.mail.author} sent you mail`)
        mailUnread()
      }
      else if (data.author === username) {
        setNotification(`You sent mail to ${data.mail.receiver}`)
      }
    })

    socket.on('block_user', data => {
      if (data.to === username) {
        if (data.block) {
          addToFavorites(data.from, 'remove')
        }

        beingBlocked(data.from, data.block)
        destroySession(data.from)
      }
    })
  }, [])

  useEffect(() => {
    if (username) {
      socket.emit('newUser', username)
    }

    socket.on('chat', data => {
      if (data.to === username) {
        receiveChatMessage(data.from, data.message)

      }
    })

    socket.on('disconnect', (reason) => {
      console.log(reason, 'socket disconnect reason *********************')
      if (reason === 'io server disconnect') {
        socket.connect()
      }
    })
  }, [username])



  const handleLogout = async () => {
    await history.push('/')
    logout()
  }
  

  return <Paper className={classes.root} elevation={5}>
    <img src='/assets/images/title3.png' alt='title' />
    <div className={classes.loggedInContainer}>
      {
        loggedIn
          ?
          <div className={classes.loggedIn}>
            <div className={classes.iconAndText}>
              <PersonIcon style={{ paddingRight: '5px' }} /> <p>Logged in: <span className={classes.username}>{username}</span></p>
            </div>
            <img src="/assets/images/boygirl.png" width='130' alt='face' />
            <div className={classes.iconAndText}>
              <ExitToAppIcon style={{ paddingRight: '5px' }} />
              <Button color='primary' size='small' onClick={handleLogout}>Log out</Button>
            </div>
          </div>
          :
          ''
      }

      {chatOpen && <Chat />}
      {chatOpen && <ChatButtons />}
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
  receiveChatMessage,
  mailUnread,
  addToFavorites,
  beingBlocked,
  destroySession
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))
