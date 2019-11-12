import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import Chat from './chat/Chat'
import { connect } from 'react-redux'
import { toggleChat } from '../../actions/chat'

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
    cursor: 'pointer'
  },
  active: {
    color: 'white'
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
        Send Mail
        </NavLink></p>

        <p className={classes.navLink} onClick={() => {
          props.toggleChat()
        }}>Chat</p>

        {/* <p><NavLink
        to={`/search/profiles/${props.match.params.username}/chat`}
        exact
        className={classes.navLink}
        activeClassName={classes.active}
      >
        Chat
        </NavLink></p> */}
        {props.chatOpen && <Chat />}
    </div>
  )
}

const mapStateToProps = state => ({
  chatOpen: state.chat.chatOpen
})

export default connect(mapStateToProps, { toggleChat })(SendMailNavigation)