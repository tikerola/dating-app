import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { connect } from 'react-redux'
import { logout } from '../../actions/user'
import { withRouter } from 'react-router-dom'


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

  const classes = useStyles()

  const handleLogout = () => {
    props.logout()
    props.history.push('/')
  }

  return <Paper className={classes.root} elevation={5}>
    <img src='/assets/images/title.png' alt='title' />
    <div className={classes.loggedInContainer}>
      {
        props.loggedIn 
        ?
        <div className={classes.loggedIn}><p>Logged in: <span className={classes.username}>{props.username}</span></p>
        { props.profile && <img src={props.profile.image} width='130' alt='face' />}
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
  logout
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))
