import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import FileUpload from './FileUpload'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  p: {
    marginLeft: '10%',
    cursor: 'pointer'
  },
  navLink: {
    color: '#999',
    textDecoration: 'none'
  },
  active: {
    color: 'white'
  }
})

const MailNavigationContent = props => {

  const [ showFileUpload, setShowFileUpload ] = React.useState(false)

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p className={classes.p}><NavLink
        to={`/profile/edit`}
        exact
        className={classes.navLink}
        activeClassName={classes.active}
      >
        Edit Profile Text
        </NavLink></p>

        <p className={classes.p} onClick={() => setShowFileUpload(!showFileUpload)}>Add Image</p>
        { showFileUpload && <FileUpload setShowFileUpload={setShowFileUpload} />}
    </div>
  )
}

export default MailNavigationContent