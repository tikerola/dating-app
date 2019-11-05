import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Slider, Button } from '@material-ui/core/'


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
    marginRight: 'auto'
  },
  button: {
    marginTop: '20px'
  }
});

function valuetext(value) {
  return `${value}`;
}

export default function Search() {
  const classes = useStyles()
  const [value, setValue] = React.useState([18, 99])

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <Button className={classes.button} variant='contained' color='primary'>Search</Button>
    </div>
  );
}