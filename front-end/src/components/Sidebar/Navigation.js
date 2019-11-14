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
    color: '#bbb',
    //boxShadow: '0px 2px 18px 2px rgba(255,255,255,0.75)'
    boxShadow: '-1px 5px 18px 0px rgba(255,255,255,0.7)'
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
    <p><NavLink to="/profile" activeClassName={classes.active} className={classes.navLink} exact >Profile</NavLink></p>
    <p><NavLink to="/search" activeClassName={classes.active} className={classes.navLink} >Search</NavLink></p>
  </div>
}

export default Navigation