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
    marginBottom: '10px'
    
  },
  cardContent: {
    padding: 0
  },
  image: {
    margin: '0 auto'
  },
  button: {
    margin: '0 auto',
    fontSize: '0.5em'
  },
});

const ProfileThumbnail = props => {
  const classes = useStyles()
  

  return (
    <Card className={classes.card} elevation={10} onClick={() => props.setSelectedProfile(props.username)}>
      <CardContent className={classes.cardContent}>
        <img src={props.image} alt="profile" width="90" className={classes.image} />
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.button} color="primary">{props.username}</Button>
      </CardActions>
    </Card>
  );
}
export default ProfileThumbnail