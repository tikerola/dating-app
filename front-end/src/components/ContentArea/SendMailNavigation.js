import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { createChatSession, openChat } from '../../actions/chat'
import { addToFavorites } from '../../actions/user'
import ChatIcon from '@material-ui/icons/Chat'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'

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
        <ChatIcon className={classes.icon} /> Chat
      </p>
        
      <p  >
        { props.isFavorite 
        ? 
        <span className={classes.navLink} onClick={() => props.addToFavorites(props.match.params.username, 'remove')}>
          <StarIcon className={classes.icon} /> 
          Remove from favorites
          </span>
        :
        <span className={classes.navLink} onClick={() => props.addToFavorites(props.match.params.username, 'add')}>
          <StarBorderIcon className={classes.icon} /> 
          Add to favorites
          </span>
      }
      </p>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  username: state.user.username,
  session: state.chat.sessions[ownProps.match.params.username],
  isFavorite: state.user.favorites.includes(ownProps.match.params.username)
})

export default connect(mapStateToProps, { createChatSession, openChat, addToFavorites })(SendMailNavigation)