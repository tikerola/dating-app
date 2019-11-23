
const initialState = {
  sessions: {},
  chatWith: '',
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
            ...state.sessions[action.id],
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
            ...state.sessions[action.id],
            messages: state.sessions[action.id].messages.concat(action.message)
          }
        }
      }

    case 'CREATE_CHAT_SESSION': 
    return {
      ...state,
      chatOpen: true,
      chatWith: (action.setChatWith || Object.keys(state.sessions).length === 0) ? action.id : state.chatWith ,
      sessions: {
        ...state.sessions,
        [action.id]: action.session
      }
    }

    case 'SET_CHAT_WITH': 
    return {
      ...state,
      chatWith: action.chatWith
    }

    case 'SET_DOT':
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [action.id]: {
            ...state.sessions[action.id],
            dot: action.onOff
          }
        }
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}