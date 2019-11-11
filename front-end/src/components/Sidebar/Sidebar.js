import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import LoginAndSignup from './LoginAndSignup'
import { connect } from 'react-redux'
import Search from './Search'
import Navigation from './Navigation'
import { Route, Redirect } from 'react-router-dom'
import OwnProfileStats from './OwnProfileStats'
import ProfileStats from './ProfileStats'


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
    { props.loggedIn && <Navigation /> }
    <Route exact path="/search/profiles/:username" component={ProfileStats} />
    <Route path="/search" component={Search} />
    <Route path="/profile" component={OwnProfileStats} />
    <Route path="/" render={() => !props.loggedIn ? <LoginAndSignup /> : <Redirect to="/profile" /> } />
    

  </Paper>
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(Sidebar)