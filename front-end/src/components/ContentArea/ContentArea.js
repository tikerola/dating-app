import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { Route } from 'react-router-dom'
import Profiles from './Profiles'
import Profile from './Profile'
import Navigation from './Navigation'
import OwnProfile from './OwnProfile'
import Inbox from './Inbox'
import SentMail from './SentMail'
import MailContent from './MailContent'
import SendMailForm from './SendMailForm'

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
    <Route exact path="/search/profiles/:username" render={() => <Profile />} />
    <Route exact path="/search/profiles" render={() => <Profiles />} />
    <Route exact path="/profile/inbox/:id/reply" component={SendMailForm} />
    <Route exact path="/profile/inbox/:id" component={MailContent} />
    <Route exact path="/profile/inbox" component={Inbox} />
    <Route exact path="/profile/sent" component={SentMail} />
    <Route exact path="/profile" component={OwnProfile} />
  
  </Paper>
}


export default ContentArea