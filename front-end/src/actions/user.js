
import signupService from '../services/user'

export const signup = userData => {
  return {
    type: 'SIGNUP',
    userData
  }
}

export const login = credentials => {
  return async dispatch => {

    const response = await signupService.login(credentials)
    localStorage.setItem('userData', JSON.stringify(response))

    dispatch({
      type: 'LOGIN',
      userData: response
    })
  }
}

export const setUserFromStorage = userData => {
  return {
    type: 'SET_USER_FROM_STORAGE',
    userData
  }
}

export const logout = () => {
  localStorage.clear()

  return {
    type: 'LOGOUT'
  }
}