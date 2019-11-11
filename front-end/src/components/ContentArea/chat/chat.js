import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

const ChatPortal = props => {

  let externalWindow = useRef(null)
  

  useEffect(() => {
    externalWindow.current = window.open('', '', 'width=400,height=500,left=200,top=200')
   
    externalWindow.current.document.title = 'Let\'s find love - chat';

    externalWindow.current.addEventListener('beforeunload', () => {
      props.closeWindowPortal();
    });

    return () => {
      externalWindow.current.close()
    }
  })

  return ReactDOM.createPortal(props.children, document.body)
}

const Chat = props => {
  const [showPortal, setShowPortal] = useState(true)

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      closeWindowPortal();
    });
  })

  // const toggleWindowPortal = () => {
  //   setShowPortal(!showPortal)
  // }

  const closeWindowPortal = () => {
    setShowPortal(false)
  }

  return <div>
    { showPortal && <ChatPortal closeWindowPortal={closeWindowPortal}>
      <div>Fuck you</div>

      <button onClick={() => closeWindowPortal()} >
        Close me!
            </button>
    </ChatPortal>}
  </div>
}

export default Chat