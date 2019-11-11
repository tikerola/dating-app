import React from 'react'
import { Launcher } from 'react-chat-window'


const Chat = props => {

  const [ messages, setMessages ] = React.useState([])

  const onMessageWasSent = message => {
    setMessages([...messages, message])
  }

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: 'Let\'s find love - Chat',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={onMessageWasSent}
        messageList={messages}
        showEmoji
        
      />
    </div>
  )
}

export default Chat