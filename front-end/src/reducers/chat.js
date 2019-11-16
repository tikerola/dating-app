
const initialState = {
  sessions: {
    
  }
  ,
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
        sessions: {
          ...state.sessions,
          [action.id]: {
            ...[action.id],
            messages: state.sessions[action.id].messages.concat(action.message)
          }
        }
      }

    case 'RECEIVE_CHAT_MESSAGE':
      return {
        ...state,
        chatOpen: true,
        sessions: {
          ...state.sessions,
          [action.id]: {
            ...[action.id],
            messages: state.sessions[action.id].messages.concat(action.message)
          }
        }
      }

    case 'CREATE_CHAT_SESSION': 
    return {
      ...state,
      chatOpen: true,
      sessions: {
        ...state.sessions,
        [action.id]: action.session
      }
    }

    case 'RESET':
      return initialState

    default:
      return state
  }
}