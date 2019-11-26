import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '40%',
    margin: '0 auto',
    paddingTop: '8%',
    color: '#bbb'
  },
  buttonContainer: {
    width: '80%',
    paddingTop: '3%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  headersAndImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

const EraseProfile = props => {

  const classes = useStyles()

  return <div className={classes.root}>
    <div className={classes.headersAndImage}>
      <div className={classes.headerContainer}>
        <h1>Sad to see you go!</h1>
        <h2>Are you certain that you want to leave us?</h2>
      </div>
      <img src="./assets/images/tear1.png" width="120" alt="cry" />
    </div>
    <div className={classes.buttonContainer}>
      <Button color="secondary" variant="contained">Erase Profile</Button>
      <Button color="primary" variant="outlined" onClick={() => props.history.push("/profile")} >Cancel</Button>
    </div>

  </div>
}

export default EraseProfile


