import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchInbox, fetchSent } from '../../actions/mail'
import { Paper } from '@material-ui/core'
import { theme } from '../../theme/theme'

const useStyles = makeStyles({
  root: {
    height: '90%',
    width: '100%',
    color: '#bbb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '20%',
    alignItems: 'center',
    
  },
  statsContainer: {
    width: '80%',
    height: '40%',
  },
  postsContainer: {
    width: '80%',
    marginTop: '40px'
  },
  link: {
    color: '#bbb'
  },
  paper: {
    background: theme.sidebarBackground,
    padding: '16px',
    color: '#bbb',
    textAlign: 'center'
  }
})

const OwnProfileStats = ({ user, fetchInbox, fetchSent }) => {

  const classes = useStyles()

  return <div className={classes.root}>
    <div className={classes.statsContainer}>
      <Paper elevation={10} className={classes.paper}>
      <h2>Personal info</h2>
      <p>Username: {user.username}</p>
      <p>Gender: {user.gender}</p>
      <p>Age: {user.age}</p>
      </Paper>
    </div>
    <div className={classes.postsContainer}>
      <Paper elevation={10} className={classes.paper}>
      <h2>Posts</h2>
      <p><Link to="/profile/inbox" className={classes.link} onClick={() => fetchInbox()}>Inbox</Link></p>
      <p><Link to="/profile/sent" className={classes.link} onClick={() => fetchSent()} >Sent mail</Link></p>
      </Paper>
    </div>
  </div>
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  fetchInbox,
  fetchSent
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProfileStats)