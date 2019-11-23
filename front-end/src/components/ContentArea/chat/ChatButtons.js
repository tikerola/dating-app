import React from 'react'
import { styled } from '@material-ui/styles'
import { connect } from 'react-redux'
import { setChatWith } from '../../../actions/chat'
import { Badge } from '@material-ui/core'

const CustomButton = styled('div')({
  width: '100px',
  height: '30px',
  background: 'rgba(0,0,0,0.9)',
  color: '#bbb',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)',
  position: 'fixed',
  bottom: '30px',
  fontSize: '0.8em',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid blue',
  cursor: 'pointer'
})



const ChatButtons = ({ candidates, chatWith, setChatWith }) => {

  const styles = (index, name) => {
    return {
      left: 150 + index * 130 ,
      color: chatWith === name ? 'white' : '#999'
    }
  }

  return <div>
    {candidates && candidates.map((name, index) =>
      <CustomButton
        key={index}
        style={styles(index, name)}
        onClick={() => setChatWith(name)}
      >
        <Badge badgeContent={chatWith === name ? 0 : 1} color="primary" variant="dot" anchorOrigin={{
          horizontal: "right",
          vertical: "top"
        }}>
          {name.length > 5 ? `${name.substring(0, 5)}...` : name}
        </Badge>
      </CustomButton>)}
  </div>
}

const mapStateToProps = state => ({
  candidates: Object.keys(state.chat.sessions),
  chatWith: state.chat.chatWith
})

export default connect(mapStateToProps, { setChatWith })(ChatButtons)