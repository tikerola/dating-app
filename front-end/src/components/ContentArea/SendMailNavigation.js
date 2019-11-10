import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    marginLeft: '10%'
  },
  navLink: {
    color: '#999',
    textDecoration: 'none'
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
    </div>
  )
}

export default SendMailNavigation