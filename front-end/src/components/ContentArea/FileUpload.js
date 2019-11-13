import React from 'react'
import { styled } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { addProfileImage } from '../../actions/user'

const FileWindow = styled('div')({
  width: '300px',
  height: '40px',
  backgroundColor: '#1769aa',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  borderRadius: '5px',
  position: 'fixed',
  zIndex: 50,
  left: '50%',
  top: '50%',
  fontSize: '17px',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)'
})


const FileUpload = props => {

  const handleChange = e => {
    props.addProfileImage(e.target.files['0'])
    props.setShowFileUpload(false)
  }

  return <FileWindow>
      <Button
        color="primary"
        variant="contained"
        component="label"
      >
        Upload File
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </Button>
  </FileWindow>
}

export default connect(null, { addProfileImage })(FileUpload)
