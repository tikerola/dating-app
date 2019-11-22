import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import ProfilePicture from './ProfilePicture'

const useStyles = makeStyles({
  root: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: '#bbb'
  },
  container: {
    width: '90%',
    height: '70%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: '20px'

  },
  image: {
    borderRadius: '5px',
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
    cursor: 'pointer'
  },
  text: {
    width: '90%',
    height: '90%',
    marginLeft: '20px',
    marginRight: '20px',

  },
  noText: {
    width: '90%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  }
})


const Profile = ({ profile }) => {
  const [showBigPicture, setShowBigPicture] = React.useState(false)
  const classes = useStyles()

  if (!profile)
    return <div></div>

  return (
    <div className={classes.root}>
      <h1>{profile.username}</h1>
      <div className={classes.container}>
        <img
          src={profile.image.imageUrl}
          alt={`${profile.username}`}
          width="150"
          className={classes.image}
          onClick={() => setShowBigPicture(true)}
        />
        <div className={classes.text}>
          {profile.profileText ? profile.profileText : <div className={classes.noText}>No profile text added yet</div>}
        </div>
      </div>
      {showBigPicture && <ProfilePicture imageUrl={profile.image.imageUrl} showImage={setShowBigPicture} />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(Profile))