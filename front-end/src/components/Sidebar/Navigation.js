import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '10%',
    background: theme.smallNavigationBackground,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: '#bbb'
  },
  navLink: {
    color: '#999',
    textDecoration: 'none'
  },
  active: {
    color: 'white'
  }
})

const Navigation = props => {

  const classes = useStyles()

  return <div className={classes.root}>
    <p><NavLink to="/" activeClassName={classes.active} className={classes.navLink} exact >Profile</NavLink></p>
    <p><NavLink to="/search" activeClassName={classes.active} className={classes.navLink} >Search</NavLink></p>
  </div>
}

export default Navigation