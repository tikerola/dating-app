import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'

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
    marginLeft: '150px'
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

        <p><NavLink
        to={`/search/profiles/${props.match.params.username}/chat`}
        exact
        className={classes.navLink}
        activeClassName={classes.active}
      >
        Chat
        </NavLink></p>
    </div>
  )
}

export default SendMailNavigation