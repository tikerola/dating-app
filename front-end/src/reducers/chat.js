
const initialState = {
  chatOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_CHAT':
      return {
        chatOpen: true
      }

    case 'CLOSE_CHAT':
      return {
        chatOpen: false
      }

    case 'TOGGLE_CHAT':
      return {
        chatOpen: !state.chatOpen
      }

    default:
      return state
  }
}