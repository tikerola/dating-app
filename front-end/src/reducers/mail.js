
const initialState = {
  inbox: [],
  sent: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_INBOX':
      return {
        ...state,
        inbox: action.inbox
      }

    case 'FETCH_SENT':
      return {
        ...state,
        sent: action.sent
      }

    case 'REPLY':
    case 'SEND_MAIL':
      return {
        ...state,
        sent: state.sent.concat(action.mail)
      }

    case 'RESET':
      return initialState

      case 'DELETE_MAIL':
        return {
          ...state,
          [action.source]: state[action.source].filter(mail => mail.id !== action.id)
        }

    default:
      return state
  }
}