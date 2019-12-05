import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles({
  card: {
    width: '90px',
    height: '100%',
    background: 'black',
    marginLeft: '10px',
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardContent: {
    padding: 0
  },
  image: {
    margin: '0 auto',
    width: '100%'
  },
  button: {
    margin: '0 auto',
    fontSize: '0.5em'
  },
  dot: {
    width: '5px',
    height: '5px',
    backgroundColor: 'green',
    fontSize: '0.8em',
    borderRadius: '50px',
    marginLeft: '10px'
  }
});

const ProfileThumbnail = props => {
  const classes = useStyles()

  return (
    <Card className={classes.card} elevation={10}>
      <CardContent className={classes.cardContent}>
        <img src={props.image} alt="profile" className={classes.image} onLoad={() => {
          if (props.index === 0) {
            props.setLoading(false)
          }
        }} />
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.button} color="primary">
          {props.username.length > 5 ? `${props.username.substring(0, 5)}...` : props.username}
          <div className={classes.dot} style={{ backgroundColor: props.online ? 'green' : '#333' }} /></Button>
      </CardActions>
    </Card>
  );
}
export default ProfileThumbnail