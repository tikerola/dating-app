import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import LoginAndSignup from './LoginAndSignup'
import { connect } from 'react-redux'
import Search from './Search'
import Navigation from './Navigation'
import { Route } from 'react-router-dom'
import Profile from './Profile'


const useStyles = makeStyles({
  root: {
    background: theme.searchbarBackground,
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
    <Navigation />
    <Route path="/search" component={Search} />
    <Route exact path="/" render={() => !props.loggedIn ? <LoginAndSignup /> : <Profile /> } />
    

  </Paper>
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(Sidebar)