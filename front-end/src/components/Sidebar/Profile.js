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
    
  }
})

const Profile = ({ user }) => {

  const classes = useStyles()

  return <div className={classes.root}>
    <div className={classes.container}>
      <h2>Personal info</h2>
      <p>Username: {user.username}</p>
      <p>Gender: {user.gender}</p>
      <p>Age: {user.age}</p>
      <h2>Posts</h2>
      <p>Inbox</p>
      <p>Sent mail</p>
    </div>
  </div>
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Profile)