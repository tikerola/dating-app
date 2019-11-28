import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import ProfilePicture from './ProfilePicture'

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
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
    cursor: 'pointer'
  },
  text: {
    marginLeft: '20px',
    marginRight: '20px'
  }
})


const Profile = ({ match, profile }) => {
  const [showBigPicture, setShowBigPicture] = React.useState(false)
  const classes = useStyles()

  if (!profile)
    return <div></div>

  return (
    <div className={classes.root}>
      <h1>{profile.username} <span style={{ fontSize: '0.5em', color: '#666'}}>
        ({profile.online ? 'online' : 'offline'})</span></h1>
      <div className={classes.container}>
        <img
          src={profile.image.imageUrl}
          alt={`${profile.username}`}
          width="150"
          className={classes.image}
          onClick={() => setShowBigPicture(true)}
        />
        <p className={classes.text}>{profile.profileText}</p>
      </div>
      {showBigPicture && <ProfilePicture imageUrl={profile.image.imageUrl} showImage={setShowBigPicture} />}
    </div>
  )
}

const mapStateToProps = (state, { match }) => {
  return {
    profile: state.profiles.find(profile => profile.username === match.params.username)
  }
}

export default connect(mapStateToProps)(withRouter(Profile))