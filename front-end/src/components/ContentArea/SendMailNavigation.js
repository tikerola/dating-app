import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { createChatSession } from '../../actions/chat'


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
          props.createChatSession(props.match.params.username, props.username)
        }}>Chat</p>
       
    </div>
  )
}

const mapStateToProps = state => ({
  username: state.user.username
})

export default connect(mapStateToProps, { createChatSession })(SendMailNavigation)