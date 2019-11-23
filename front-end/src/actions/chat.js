
import { setNotification } from './notification'
import { socket } from '../index'


export const openChat = () => ({
  type: 'OPEN_CHAT'
})

export const closeChat = () => ({
  type: 'CLOSE_CHAT'
})

export const toggleChat = () => ({
  type: 'TOGGLE_CHAT'
})

export const sendChatMessage = (from, to, message) => {
  
  return async (dispatch, getState) => {
    socket.emit('chat', { from, to, message })

    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      id: to,
      message: `You: ${message}`
    })
  }
}

export const createChatSession = (to) => {
  const session = {
    messages: []
  }

  return {
    type: 'CREATE_CHAT_SESSION',
    id: to,
    session
  }
}

export const receiveChatMessage = (from, message) => {
  return async (dispatch, getState) => {

    const sessions = getState().chat.sessions
    const chatWith = getState().chat.chatWith

    if (!sessions[from]) {
      await dispatch(createChatSession(from))
    }

    if(chatWith !== from) {
      dispatch(setNotification(`${from}: ${message.substring(0, 20)}...`))
    }

    dispatch({type: 'RECEIVE_CHAT_MESSAGE',
    id: from,
    message: `${from}: ${message}`})

  }
}

export const setChatWith = chatWith => ({
  type: 'SET_CHAT_WITH',
  chatWith
})