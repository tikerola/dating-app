import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import FileUpload from './FileUpload'
import PhotoIcon from '@material-ui/icons/Photo'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#999'
  },
  navLink: {
    color: '#999',
    textDecoration: 'none',
    marginLeft: '150px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  active: {
    color: 'white'
  },
  icon: {
    paddingRight: '5px'
  }
})

const MailNavigationContent = props => {

  const [showFileUpload, setShowFileUpload] = React.useState(false)

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p >
        <NavLink
          to={`/profile/edit`}
          exact
          className={classes.navLink}
          activeClassName={classes.active}
        >
          <EditIcon className={classes.icon} />
          Edit Profile Text
        </NavLink></p>
      <p className={classes.navLink} onClick={() => setShowFileUpload(!showFileUpload)}>
        <PhotoIcon className={classes.icon} />
        Add Image</p>
      {showFileUpload && <FileUpload setShowFileUpload={setShowFileUpload} />}
    </div>
  )
}

export default MailNavigationContent