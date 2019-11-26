import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Grid, Switch } from '@material-ui/core'
import { connect } from 'react-redux'
import { theme } from '../../theme/theme'
import { Paper } from '@material-ui/core'
import { toggleChatEnabled } from '../../actions/user'

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '90%',
    margin: '0 auto',
    color: '#bbb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '20%'
  },
  container: {
    width: '100%',
    height: '50%',
    textAlign: 'center'
  },
  typography: {
    marginRight: 'auto'
  },
  link: {
    color: '#bbb'
  },
  paper: {
    background: theme.sidebarBackground,
    padding: '16px',
    paddingLeft: '40px',
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
})

const Settings = ({ chatEnabled, toggleChatEnabled }) => {
  
  const [hideProfile, setHideProfile] = React.useState(false)
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
              classes={{
                switchBase: classes.switchBase
              }}
              checked={chatEnabled}
              onChange={e => toggleChatEnabled(!chatEnabled)}
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
              classes={{
                switchBase: classes.switchBase
              }}
              checked={hideProfile}
              onChange={e => setHideProfile(!hideProfile)}
              value="male"
              color="primary"
            />
          </Grid>
          <Grid item>Visible</Grid>
        </Grid>

      </Paper>
    </div>
  </div>
}

const mapStateToProps = state => ({
  chatEnabled: state.user.profile.chatEnabled
})


export default connect(mapStateToProps, { toggleChatEnabled })(Settings)