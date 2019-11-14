
import chatService from '../services/chat'

export const openChat = () => ({
  type: 'OPEN_CHAT'
})

export const closeChat = () => ({
  type: 'CLOSE_CHAT'
})

export const toggleChat = () => ({
  type: 'TOGGLE_CHAT'
})

export const sendChatMessage = (message) => {
  
  return async (dispatch, getState) => {
    const { token } = getState().user
    chatService.saveToken(token)

    const response = await chatService.sendChatMessage(message)

    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      message: response
    })
  }
}

export const receiveChatMessage = message => ({
  type: 'RECEIVE_CHAT_MESSAGE',
  message
})