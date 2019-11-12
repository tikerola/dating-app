import React, { useState } from 'react'
import { styled, makeStyles } from '@material-ui/styles'
import useField from '../../../hooks/useField'
import ArrowDropDownCircleTwoToneIcon from '@material-ui/icons/ArrowDropDownCircleTwoTone'


const ChatWindowMax = styled('div')({
  width: '300px',
  height: '400px',
  backgroundColor: '#1769aa',
  color: '#fff',
  textAlign: 'center',
  padding: '1%',
  borderRadius: '5px',
  position: 'fixed',
  zIndex: 50,
  right: '5%',
  bottom: '30px',
  fontSize: '17px',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)'
})

const ChatWindowMin = styled('div')({
  width: '300px',
  backgroundColor: '#1769aa',
  color: '#fff',
  textAlign: 'center',
  borderRadius: '5px',
  padding: '1%',
  position: 'fixed',
  zIndex: 50,
  right: '5%',
  bottom: '30px',
  fontSize: '17px',
  boxShadow: '0px 4px 18px 7px rgba(0,0,0,0.75)'
})

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',

  },
  navigation: {
    height: '12%',
    color: 'white',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '2%',
    padding: '5px',
    boxShadow: '0px 0px 13px 0px rgba(0,0,0,0.75)'

  },
  body: {
    height: '84%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingTop: '10px',


  },
  text: {
    height: '85%',
    overflow: 'auto',
    color: 'white',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '5%'
  },
  inputContainer: {
    height: '15%',
    width: '100%',
    padding: 0,
    borderRadius: '5px',
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    padding: '10px',
    margin: 0,
    width: '92%',
    borderRadius: '5px'
  }
})

const Chat = props => {
  const [maximized, setMaximized] = useState(false)
  const [comments, setComments] = useState([])
  const [comment, clearComment] = useField('text')

  const classes = useStyles()

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      setComments([...comments, comment.value])
      console.log(comments)
      clearComment()
    }
  }

  if (!maximized)
    return <ChatWindowMin onClick={() => setMaximized(true)}>Chat</ChatWindowMin>

  return (
    <ChatWindowMax>
      <div className={classes.root}>
        <div className={classes.navigation}>
          <p>Let's Find Love - Chat</p>
          <ArrowDropDownCircleTwoToneIcon onClick={() => setMaximized(false)}>minimize</ArrowDropDownCircleTwoToneIcon>
        </div>
        <div className={classes.body}>
          <div className={classes.text}>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
              {comments.map((comment, index) => <li style={{ padding: '10px' }} key={index}>{comment}</li>)}
            </ul>
          </div>
          <div className={classes.inputContainer}>
            <input {...comment} onKeyUp={handleKeyUp} className={classes.input} placeholder="write something..." />
          </div>
        </div>
      </div>
    </ChatWindowMax>

  )
}

export default Chat