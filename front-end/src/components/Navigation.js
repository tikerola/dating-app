import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../theme/theme'

const useStyles = makeStyles({
  root: {
    width: '97%',
    height: '10%',
    padding: '10px',
    margin: '15px auto',
    backgroundColor: theme.navigationBackgound
  }
})

const Navigation = props => {

  const classes = useStyles()

  return <Paper className={classes.root} elevation={5}>
    <img src='/assets/images/title.png' alt='title' />

  </Paper>
}

export default Navigation
