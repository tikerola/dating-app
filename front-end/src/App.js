import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import ContentArea from './components/ContentArea'
import { theme } from './theme/theme'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: "url('/assets/images/33.jpg')",
    margin: 0,
    padding: 0
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


function App() {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.container} elevation={8}>
        <Navigation />
        <div className={classes.contentContainer}>
          <Sidebar />
          <ContentArea />
        </div>
      </Paper>
    </div>
  );
}

export default App;
