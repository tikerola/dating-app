import React from 'react'
import { styled } from '@material-ui/styles'



const ImageWindow = styled('div')({
  width: '400px',
  backgroundColor: 'rgba(0,0,0,0.8)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  borderRadius: '5px',
  position: 'fixed',
  zIndex: 50,
  left: window.innerWidth / 2 - 200,
  top: window.innerHeight / 2 - 200,
  fontSize: '17px',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)',
  cursor: 'pointer'
})


const ProfilePicture = props => {
  
  return <ImageWindow onClick={() => props.showImage(false)} >
    <img src={props.imageUrl} alt="profile" width="400" />
  </ImageWindow>
}

export default ProfilePicture
