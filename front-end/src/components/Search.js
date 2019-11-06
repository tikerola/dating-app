import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Slider, Button, Typography, Grid, Switch } from '@material-ui/core/'
import { connect } from 'react-redux'
import { searchProfiles } from '../actions/profiles'


const useStyles = makeStyles({
  root: {
    width: '60%',
    margin: '15px auto',
    color: '#bbb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    color: '#bbb'
  },
  typography: {
    marginTop: '25px',
    marginRight: 'auto'
  },
  button: {
    marginTop: '30px'
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
  checked: {}
});

function valuetext(value) {
  return `${value}`;
}

const Search = props => {
  const classes = useStyles()
  const [value, setValue] = React.useState([18, 99])
  const [gender, setGender] = React.useState(true)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const handleSubmit = () => {
    
    props.searchProfiles({
      age: value,
      gender: gender === false ? 'male' : 'female'
    })
  }

  return (
    <div className={classes.root}>
      <h1>Search</h1>
      <Typography className={classes.typography} id="age-slider" gutterBottom>
        Age range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="age-slider"
        getAriaValueText={valuetext}
      />


      <Typography className={classes.typography} component="div">
        Looking for
          </Typography>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Men</Grid>
        <Grid item>
          <Switch
            classes={{
              switchBase: classes.switchBase
            }}
            checked={gender}
            onChange={e => setGender(e.target.checked)}
            value="male"
            color="primary"
          />
        </Grid>
        <Grid item>Women</Grid>
      </Grid>


      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        onClick={handleSubmit}
      >
        Search
        </Button>
    </div>
  );
}


export default connect(null, { searchProfiles })(Search)