
const initialState = {
  messages: [],
  chatOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_CHAT':
      return {
        ...state,
        chatOpen: true
      }

    case 'CLOSE_CHAT':
      return {
        ...state,
        chatOpen: false
      }

    case 'TOGGLE_CHAT':
      return {
        ...state,
        chatOpen: !state.chatOpen
      }

    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        messages: state.messages.concat(action.message)
      }

      case 'RECEIVE_CHAT_MESSAGE':
        return {
          chatOpen: true,
          messages: state.messages.concat(action.message)
        }

      case 'RESET':
        return initialState

    default:
      return state
  }
}