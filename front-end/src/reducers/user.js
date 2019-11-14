
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
      return {
        loggedIn: true,
        ...action.userData
      }

    case 'LOGOUT':
    case 'RESET':
      return initialState

    case 'EDIT_PROFILE_TEXT':
      return {
        ...state,
        profile: action.profile
      }

    case 'ADD_PROFILE_PICTURE':
      return {
        ...state,
        profile: {
          ...state.profile,
          image: action.image
        }
      }

    default:
      return state
  }
}