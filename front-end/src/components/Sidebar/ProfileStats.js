import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { theme } from '../../theme/theme'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    height: '90%',
    width: '100%',
    color: '#bbb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '20%',
    alignItems: 'center',

  },
  container: {
    width: '80%',
    height: '50%',
  },
  link: {
    color: '#bbb'
  },
  paper: {
    background: theme.sidebarBackground,
    padding: '16px',
    color: '#bbb',
    textAlign: 'center'
  }
})

const ProfileStats = ({ profile, fromFavorites }) => {

  const classes = useStyles()

  return <div className={classes.root}>
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={10}>
        <h2>Personal info</h2>
        <p>Username: {profile.username}</p>
        <p>Gender: {profile.gender}</p>
        <p>Age: {profile.age}</p>
      </Paper>
    </div>
  </div>
}

const mapStateToProps = (state, { match }) => {
  return {
    profile: state.profiles.find(profile => profile.username === match.params.username)
  }
}


export default connect(mapStateToProps)(ProfileStats)