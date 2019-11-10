import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'

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
    width: '60%',
    height: '50%',
  },
  link: {
    color: '#bbb'
  }
})

const ProfileStats = ({ profile }) => {

  const classes = useStyles()

  return <div className={classes.root}>
    <div className={classes.container}>
      <h2>Personal info</h2>
      <p>Username: {profile.username}</p>
      <p>Gender: {profile.gender}</p>
      <p>Age: {profile.age}</p>
    </div>
  </div>
}

const mapStateToProps = (state, ownProps) => ({
  profile: state.profiles.find(profile => profile.username === ownProps.match.params.username)
})


export default connect(mapStateToProps)(ProfileStats)