

import { socket } from '../index'
import { setNotification } from './notification'

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

    if (!sessions[from]) {
      await dispatch(createChatSession(from))
      dispatch(setNotification(`${from} wants to chat with you!`))
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