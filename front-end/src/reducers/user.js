
const initialState = {
  loggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        ...action.userData
      }
    case 'LOGIN':
    case 'SET_USER_FROM_STORAGE':
      return {
        loggedIn: true,
        ...action.userData
      }

    case 'LOGOUT':
      return initialState

    default:
      return state
  }
}