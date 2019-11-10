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

const ReplyMailNavigation = props => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p><NavLink
        to={`/profile/inbox/${props.match.params.id}/reply`}
        exact
        className={classes.navLink}
        activeClassName={classes.active}
      >
        Reply
        </NavLink></p>
    </div>
  )
}

export default ReplyMailNavigation