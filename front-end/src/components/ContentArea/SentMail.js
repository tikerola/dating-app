import React from 'react'
import { makeStyles, withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import { Link } from 'react-router-dom'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { deleteMail } from '../../actions/mail'

const StyledTableCell = withStyles({
  head: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    borderWidth: 0
  },
  body: {
    fontSize: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    borderWidth: 0
  },
})(TableCell);


const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '80%',
    color: '#bbb',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  root: {
    width: '70%',
    overflowX: 'auto',
    background: 'rgba(0, 0, 0, 0.2)'
    
  },
  table: {
    width: '100%',
  },
})

const SentMail = ({ sent, deleteMail }) => {

  const classes = useStyles()

  if (sent.length === 0)
    return <div className={classes.container}>
      <h1>No Sent Mail</h1>
    </div>

  return <div className={classes.container}>
    <h1>Sent Mail</h1>
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="left">Author</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
            <StyledTableCell align="left">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sent && sent.map(mail => (
            <TableRow key={mail.id}>
              <StyledTableCell component="th" scope="row">
                <Link to={`/profile/sent/${mail.id}`}>{mail.title}</Link>
              </StyledTableCell>
              <StyledTableCell align="left">{mail.author}</StyledTableCell>
              <StyledTableCell align="left">{moment(mail.createdAt).format('LLL')}</StyledTableCell>
              <StyledTableCell align="left">
                <DeleteForeverIcon style={{ cursor: 'pointer' }} onClick={() => deleteMail(mail.id, 'sent')} />
                </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </div>
}

const mapStateToProps = state => ({
  sent: state.mail.sent
})


export default connect(mapStateToProps, { deleteMail })(SentMail)