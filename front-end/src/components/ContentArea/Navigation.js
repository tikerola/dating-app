import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '60px',
    background: theme.smallNavigationBackground
  }
})

const Navigation = props => {

  const classes = useStyles()

  return <div className={classes.root}>

  </div>
}

export default Navigation