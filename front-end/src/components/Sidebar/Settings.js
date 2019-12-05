import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Grid, Switch } from '@material-ui/core'
import { connect } from 'react-redux'
import { theme } from '../../theme/theme'
import { Paper } from '@material-ui/core'
import { toggleChatEnabled, toggleProfileVisible } from '../../actions/user'
import { Link } from 'react-router-dom'
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded'

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '90%',
    margin: '0 auto',
    color: '#bbb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    height: '80%',
    textAlign: 'center'
  },
  typography: {
    marginRight: 'auto',
    fontSize: '1em'
  },
  link: {
    color: 'red',
    textDecoration: 'none',
    border: '1px solid red',
    padding: '5px',
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    background: theme.sidebarBackground,
    padding: '16px',
    paddingLeft: '30px',
    color: '#bbb',
    textAlign: 'left'
  },
  switchBase: {
    color: '#1769aa',
    '&$checked': {
      color: 'purple',
    },
    '&$checked + $track': {
      backgroundColor: 'rgb(0, 0, 0, 0)',
    },
  },
  track: {},
  checked: {},
  linkContainer: {
    paddingTop: '20px',

  },
  icon: {
    paddingRight: '5px',
    paddingLeft: '15px',
    color: 'red',

  }
})

const Settings = ({ chatEnabled, toggleChatEnabled, visible, toggleProfileVisible }) => {

  const classes = useStyles()

  return <div className={classes.root}>
    <div className={classes.container}>

      <Paper className={classes.paper} elevation={10}>
        <h2>Settings</h2>
        <Typography className={classes.typography} style={{ marginTop: '25px' }} component="div">
          Chat Enabled
          </Typography>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Disabled</Grid>
          <Grid item>
            <Switch
              id="settings-chat"
              classes={{
                switchBase: classes.switchBase
              }}
              checked={chatEnabled}
              onChange={() => toggleChatEnabled(!chatEnabled)}
              value="male"
              color="primary"
            />
          </Grid>
          <Grid item>Enabled</Grid>
        </Grid>

        <Typography className={classes.typography} style={{ marginTop: '25px' }} component="div">
          Profile Visible
          </Typography>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Hidden</Grid>
          <Grid item>
            <Switch
              id="settings-hide"
              classes={{
                switchBase: classes.switchBase
              }}
              checked={visible}
              onChange={() => toggleProfileVisible(!visible)}
              value="male"
              color="primary"
            />
          </Grid>
          <Grid item>Visible</Grid>
        </Grid>

        <hr style={{ border: 'none', borderTop: '1px solid #bbb', marginTop: '15px' }} />

        <div className={classes.linkContainer}>
          <Link to="/erase" className={classes.link}><MeetingRoomRoundedIcon className={classes.icon} />Erase Profile</Link>
        </div>

      </Paper>
    </div>
  </div>
}

const mapStateToProps = state => ({
  chatEnabled: state.user.profile.chatEnabled,
  visible: state.user.profile.visible
})


export default connect(mapStateToProps, { toggleChatEnabled, toggleProfileVisible })(Settings)