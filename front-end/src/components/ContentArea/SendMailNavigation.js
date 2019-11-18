import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { createChatSession, openChat } from '../../actions/chat'
import ChatIcon from '@material-ui/icons/Chat'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#999'
  },
  navLink: {
    color: '#999',
    textDecoration: 'none',
    marginLeft: '150px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  active: {
    color: 'white'
  },
  icon: {
    paddingRight: '5px'
  }
})

const SendMailNavigation = props => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p><NavLink
        to={`/search/profiles/${props.match.params.username}/send`}
        exact
        className={classes.navLink}
        activeClassName={classes.active}
      >
        <MailOutlineIcon className={classes.icon} />
        Send Mail
        </NavLink></p>

      <p className={classes.navLink} onClick={() => {
        if (!props.session)
          props.createChatSession(props.match.params.username, props.username)

        else
          props.openChat()
      }}>
        <ChatIcon className={classes.icon} /> Chat</p>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  username: state.user.username,
  session: state.chat.sessions[ownProps.match.params.username]
})

export default connect(mapStateToProps, { createChatSession, openChat })(SendMailNavigation)