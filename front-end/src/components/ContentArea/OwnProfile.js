import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

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
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 7px 4px black'
    
  },
  image: {
    borderRadius: '5px'
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

  const classes = useStyles()

  if (!profile)
    return <div></div>

  return (
    <div className={classes.root}>
      <h1>{profile.username}</h1>
      <div className={classes.container}>
        <img src={profile.image} alt={`${profile.username}`} width="100" className={classes.image} />
        <div className={classes.text}>
          {profile.profileText ? profile.profileText : <div className={classes.noText}>No profile text added yet</div>}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(Profile))