import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { Route } from 'react-router-dom'
import ReplyMailNavigation from './ReplyMailNavigation'
import EditNavigationContent from './EditNavigationContent'
import SendMailNavigation from './SendMailNavigation'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '10%',
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
    <Route exact path="/profile/inbox/:id" component={ReplyMailNavigation} />
    <Route exact path="/profile" component={EditNavigationContent} />
    <Route exact path="/search/profiles/:username" component={SendMailNavigation} />
  </div>
}

export default Navigation