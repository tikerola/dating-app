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

const MailNavigationContent = props => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p><NavLink
        to={`/profile/edit`}
        exact
        className={classes.navLink}
        activeClassName={classes.active}
      >
        Edit profile text
        </NavLink></p>
    </div>
  )
}

export default MailNavigationContent