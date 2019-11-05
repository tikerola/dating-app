import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../theme/theme'

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


  </Paper>
}


export default ContentArea