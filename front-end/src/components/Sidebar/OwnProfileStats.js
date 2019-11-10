import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchInbox, fetchSent } from '../../actions/mail'

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
  container: {
    width: '60%',
    height: '50%',
  },
  link: {
    color: '#bbb'
  }
})

const OwnProfileStats = ({ user, fetchInbox, fetchSent }) => {

  const classes = useStyles()

  return <div className={classes.root}>
    <div className={classes.container}>
      <h2>Personal info</h2>
      <p>Username: {user.username}</p>
      <p>Gender: {user.gender}</p>
      <p>Age: {user.age}</p>
      <h2>Posts</h2>
      <p><Link to="/profile/inbox" className={classes.link} onClick={() => fetchInbox()}>Inbox</Link></p>
      <p><Link to="/profile/sent" className={classes.link} onClick={() => fetchSent()} >Sent mail</Link></p>
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