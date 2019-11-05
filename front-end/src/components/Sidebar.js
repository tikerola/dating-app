import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../theme/theme'
import LoginAndSignup from './LoginAndSignup'
import { connect } from 'react-redux'


const useStyles = makeStyles({
  root: {
    background: theme.sidebarBackground,
    width: '25%',
    height: '80%',
    marginLeft: '1%',
    marginRight: '1%',
    border: '2px solid #bbb'

  }
})

const Sidebar = props => {

  const classes = useStyles()

  return <Paper className={classes.root} elevation={10}>
    { !props.loggedIn && <LoginAndSignup />}

  </Paper>
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(Sidebar)