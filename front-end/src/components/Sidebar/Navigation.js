import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../theme/theme'
import { NavLink } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

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
    
    boxShadow: '-1px 5px 18px 0px rgba(255,255,255,0.7)'
  },
  navLink: {
    color: '#999',
    textDecoration: 'none',
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

const Navigation = props => {

  const classes = useStyles()

  return <div className={classes.root}>
    <p>
      <NavLink to="/profile" activeClassName={classes.active} className={classes.navLink} exact >
        <AccountCircleIcon className={classes.icon} />
        Profile</NavLink></p>
    <p>
      <NavLink to="/search" activeClassName={classes.active} className={classes.navLink} >
      <SearchIcon className={classes.icon} />
      Search</NavLink></p>
  </div>
}

export default Navigation