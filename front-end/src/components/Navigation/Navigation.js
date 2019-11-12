import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { connect } from 'react-redux'
import { logout } from '../../actions/user'
import { withRouter } from 'react-router-dom'

import openSocket from 'socket.io-client'
import { setNotification } from '../../actions/notification'

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

  const { username, loggedIn, profile, logout, setNotification, history } = props

  const classes = useStyles()

  const socket = openSocket('http://localhost:3001')
  socket.on('mail', data => { 
    if(data.receiver === username) {
      setNotification(`${data.mail.author} sent you mail`)
    }
    else if (data.author === username) {
      setNotification(`You sent mail to ${data.mail.receiver}`)
    }
  })

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return <Paper className={classes.root} elevation={5}>
    <img src='/assets/images/title.png' alt='title' />
    <div className={classes.loggedInContainer}>
      {
        loggedIn 
        ?
        <div className={classes.loggedIn}><p>Logged in: <span className={classes.username}>{username}</span></p>
        { profile && <img src={profile.image} width='130' alt='face' />}
        <Button color='primary' size='small' onClick={handleLogout}>Log out</Button></div>
        :
        ''
      }
    </div>

  </Paper>
}

const mapStateToProps = state => ({
  username: state.user.username,
  loggedIn: state.user.loggedIn,
  profile: state.user.profile
})

const mapDispatchToProps = ({
  logout,
  setNotification
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))