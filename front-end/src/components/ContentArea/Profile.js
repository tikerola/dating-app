import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#bbb'
  },
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    borderRadius: '5px',
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)'
  },
  text: {
    marginLeft: '20px',
    marginRight: '20px'
  }
})


const Profile = ({ match, profiles }) => {

  const classes = useStyles()

  const profile = profiles.find(profile => profile.username === match.params.username)

  if (!profile)
    return <div></div>

  return (
    <div className={classes.root}>
      <h1>{profile.username}</h1>
      <div className={classes.container}>
        <img src={profile.image.imageUrl} alt={`${profile.username}`} width="150" className={classes.image} />
        <p className={classes.text}>{profile.profileText}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles
  }
}

export default connect(mapStateToProps)(withRouter(Profile))