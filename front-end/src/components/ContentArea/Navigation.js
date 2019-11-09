import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { Route } from 'react-router-dom'
import MailNavigationContent from './MailNavigationContent'
import EditNavigationContent from './EditNavigationContent'

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
    <Route exact path="/profile/inbox/:id" component={MailNavigationContent} />
    <Route exact path="/profile" component={EditNavigationContent} />

  </div>
}

export default Navigation