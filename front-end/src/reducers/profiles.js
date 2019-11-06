
const initialState = []

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SEARCH_PROFILES':
      return action.profiles


    default:
      return state
  }
}