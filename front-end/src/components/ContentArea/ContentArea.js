import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import Profiles from './Profiles'
import { Route } from 'react-router-dom'
import Profile from './Profile'
import Navigation from './Navigation'

const useStyles = makeStyles({
  root: {
    width: '74%',
    height: '80%',
    marginRight: '1%',
    background: theme.contentAreaBackground,
    border: '2px solid #bbb'
  }
})

const ContentArea = props => {

  const classes = useStyles()
  
  return <Paper className={classes.root} elevation={5}>
    <Navigation />
    <Route path="/search/profiles/:username" render={() => <Profile />} />
    <Route exact path="/search/profiles" render={() => <Profiles />} />
    

  </Paper>
}


export default ContentArea