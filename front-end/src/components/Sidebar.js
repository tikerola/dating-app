import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../theme/theme'
import Signup from './Signup'

const useStyles = makeStyles({
  root: {
    background: theme.sidebarBackground,
    width: '25%',
    height: '80%',
    marginLeft: '1%',
    marginRight: '1%'
  }
})

const Sidebar = props => {

  const classes = useStyles()

  return <Paper className={classes.root} elevation={10}>
    <Signup />

  </Paper>
}

export default Sidebar