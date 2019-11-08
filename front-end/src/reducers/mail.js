
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


    default:
      return state
  }
}