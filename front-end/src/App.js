import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Navigation from './components/Navigation/Navigation'

import { theme } from './theme/theme'
import { connect } from 'react-redux'
import { setUserFromStorage } from './actions/user'
import { BrowserRouter, Route } from 'react-router-dom'
import MainPage from './components/MainPage'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: "url('/assets/images/33.jpg')",
    margin: 0,
    padding: 0,
    fontFamily: 'roboto',
    color: theme.signupHeaderColor
  },
  container: {
    width: '95%',
    height: '90%',
    background: theme.background,
    margin: 0,
    padding: 0
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start'
  }
})


function App(props) {

  const classes = useStyles()

  useEffect(() => {
    const user = localStorage.getItem('userData')

    if (user)
      props.setUserFromStorage(JSON.parse(user))
  })

  return (
    <div className={classes.root}>
      <Paper className={classes.container} elevation={8}>
        <Navigation />
        <BrowserRouter>
          <Route path="/" render={(props) => <MainPage {...props} />} />
        </BrowserRouter>

      </Paper>
    </div>
  );
}

const mapDispatchToProps = ({
  setUserFromStorage
})

export default connect(null, mapDispatchToProps)(App);
