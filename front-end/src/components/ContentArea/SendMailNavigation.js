import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { createChatSession, openChat } from '../../actions/chat'
import { addToFavorites, blockUser } from '../../actions/user'
import ChatIcon from '@material-ui/icons/Chat'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import BlockIcon from '@material-ui/icons/Block'

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

  if (props.blockedBy)
    return null


  return (
    <div className={classes.root}>
      {console.log(props.blockedBy)}
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
          props.createChatSession(props.match.params.username, true)

        else
          props.openChat()
      }}>
        <ChatIcon className={classes.icon} /> Chat
      </p>

      <p  >
        {props.isFavorite
          ?
          <span className={classes.navLink} onClick={() => props.addToFavorites(props.match.params.username, 'remove')}>
            <StarIcon className={classes.icon} />
            Favorited
          </span>
          :
          <span className={classes.navLink} onClick={() => props.addToFavorites(props.match.params.username, 'add')}>
            <StarBorderIcon className={classes.icon} />
            Favorite
          </span>
        }
      </p>

      <p>
        {props.blocked
          ?
          <span className={classes.navLink} onClick={() => props.blockUser(props.match.params.username, false)}>
            <BlockIcon className={classes.icon} style={{ color: 'red' }} />
            Blocked
          </span>
          :
          <span className={classes.navLink} onClick={() => props.blockUser(props.match.params.username, true)}>
            <BlockIcon className={classes.icon} />
            Block
          </span>
        }
      </p>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  username: state.user.username,
  blocked: state.user.blocked.includes(ownProps.match.params.username),
  blockedBy: state.user.blockedBy.includes(ownProps.match.params.username),
  session: state.chat.sessions[ownProps.match.params.username],
  isFavorite: state.user.favorites.find(profile => profile.username === ownProps.match.params.username)
})

export default connect(mapStateToProps, { createChatSession, openChat, addToFavorites, blockUser })(SendMailNavigation)