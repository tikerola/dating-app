
import userService from '../services/user'

export const signup = userData => {
  return {
    type: 'SIGNUP',
    userData
  }
}

export const login = credentials => {
  return async dispatch => {

    const response = await userService.login(credentials)
    localStorage.setItem('userData', JSON.stringify(response))

    dispatch({
      type: 'LOGIN',
      userData: response
    })
  }
}

export const logout = () => {
  localStorage.clear()

  return {
    type: 'LOGOUT'
  }
}

export const editProfileText = profileText => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    userService.saveToken(token)

    const response = await userService.edit({ profileText })
    

    dispatch({
      type: 'EDIT_PROFILE_TEXT',
      profile: response
    })
  }
}