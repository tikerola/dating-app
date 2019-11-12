import React from 'react'
import ProfileThumbnail from './ProfileThumbnail'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import { searchProfiles } from '../../actions/profiles'
import { Link } from 'react-router-dom'


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
    gridRowGap: '20px',
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

const Profiles = ({ profiles, searchOptions, searchProfiles }) => {
  

  const classes = useStyles()

  const handlePageChange = direction => {

    searchProfiles({
      age: searchOptions.age,
      gender: searchOptions.gender,
      page: direction === 'next' ? searchOptions.page + 1 : searchOptions.page - 1,
      limit: searchOptions.limit
    })
  }

  
  return (
    <div className={classes.root}>
      <h1>Profiles</h1>
      <div className={classes.center}>
        <div className={classes.container}>
          {
            profiles.map(profile => <Link to={`/search/profiles/${profile.username}`} key={profile.id}>
              <ProfileThumbnail
                username={profile.username}
                image={profile.image}
              />
              </Link>)
          }
        </div>
      </div>
      {profiles.length > 0 && <div className={classes.pagination}>
        <Button
          disabled={searchOptions.page === 1}
          onClick={() => handlePageChange('prev')}
        >
          {'< '}prev page
        </Button>

        <Button
          disabled={searchOptions.page * searchOptions.limit >= searchOptions.profileCount}
          onClick={() => handlePageChange('next')}
        >
          next page{' >'}
        </Button>
      </div>}
    </div>
  )
}

const mapStateToProps = state => ({
  profiles: state.profiles,
  searchOptions: state.search
})

const mapDispatchToProps = {
  searchProfiles
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)