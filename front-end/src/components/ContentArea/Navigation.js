import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { Route } from 'react-router-dom'
import MailNavigationContent from './MailNavigationContent'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '60px',
    background: theme.smallNavigationBackground,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#999'
  }
})

const Navigation = props => {

  const classes = useStyles()

  return <div className={classes.root}>
    <Route path="/profile/inbox/:id" component={MailNavigationContent} />

  </div>
}

export default Navigation