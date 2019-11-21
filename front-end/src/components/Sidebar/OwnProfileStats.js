import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchInbox, fetchSent } from '../../actions/mail'
import { Paper, Badge } from '@material-ui/core'
import { theme } from '../../theme/theme'
import EmailIcon from '@material-ui/icons/Email'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

const useStyles = makeStyles({
  root: {
    height: '90%',
    width: '100%',
    color: '#bbb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '12%',
    alignItems: 'center',

  },
  statsContainer: {
    width: '80%',
    height: '40%',
  },
  postsContainer: {
    width: '80%',
    marginTop: '40px',

  },
  link: {
    color: '#bbb',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textDecoration: 'none'
  },
  paper: {
    background: theme.sidebarBackground,
    padding: '16px',
    paddingLeft: '40px',
    color: '#bbb',
    textAlign: 'left'
  },
  icon: {
    paddingRight: '5px'
  }
})

const OwnProfileStats = ({ user, fetchInbox, fetchSent, countOfUnread }) => {

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
        <p><Link to="/profile/inbox" className={classes.link} onClick={() => fetchInbox()}>
          <Badge badgeContent={countOfUnread} color="primary" anchorOrigin={{
            horizontal: "left",
            vertical: "top"
          }}>
            <EmailIcon className={classes.icon} />
          </Badge>
          Inbox</Link></p>
        <p><Link to="/profile/sent" className={classes.link} onClick={() => fetchSent()} >
          <MailOutlineIcon className={classes.icon} />
          Sent mail</Link></p>
      </Paper>
    </div>
  </div>
}

const mapStateToProps = state => ({
  user: state.user,
  countOfUnread: state.mail.countOfUnread
})

const mapDispatchToProps = {
  fetchInbox,
  fetchSent
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProfileStats)