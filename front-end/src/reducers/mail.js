
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

    default:
      return state
  }
}