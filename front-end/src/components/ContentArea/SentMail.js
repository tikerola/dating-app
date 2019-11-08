import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'


const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '90%',
    color: '#bbb',
    textAlign: 'center'
  }
})

const SentMail = ({ sent }) => {

  const classes = useStyles()

  return <div className={classes.root}>
    <h1>Sent Mail</h1>
    {
      sent && sent.map(mail => <p key={mail.id}>{mail.title}</p>)
    }

  </div>
}

const mapStateToProps = state => ({
  sent: state.mail.sent
})


export default connect(mapStateToProps)(SentMail)