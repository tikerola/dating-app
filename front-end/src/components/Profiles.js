import React from 'react'
import SingleProfile from './SingleProfile'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({

  root: {
    width: '100%',
    height: '100%',
    color: '#bbb',
    paddingTop: '15px',
    textAlign: 'center'
  },
  center: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
    
  },
  container: {
    width: '80%',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto auto',
    gridRowGap:'20px',
    alignContent: 'space-evenly'
  },
  pagination: {
    margin: '30px auto',
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    fontSize: '1.3em'
  }
})

const Profiles = ({ profiles }) => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1>Profiles</h1>
      <div className={classes.center}>
        <div className={classes.container}>
          {
            profiles.map(profile => <SingleProfile key={profile.id} username={profile.username} image={profile.image} />)
          }
        </div>
      </div>
      { profiles.length > 0 && <div className={classes.pagination}>
          <p>{'< '}prev page</p> <p>next page{' >'}</p>
      </div>}
    </div>
  )
}

const mapStateToProps = state => ({
  profiles: state.profiles
})

export default connect(mapStateToProps)(Profiles)