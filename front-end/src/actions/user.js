
import userService from '../services/user'
import { socket } from '../index'

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
  socket.disconnect()
  window.location.reload(true)

  return {
    type: 'RESET'
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

export const addProfileImage = file => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    userService.saveToken(token)

    const response = await userService.addProfileImage(file)

    dispatch({
      type: 'ADD_PROFILE_PICTURE',
      image: response
    })

  }
}

export const addToFavorites = (username, operation) => {

  return async (dispatch, getState) => {
    const { token } = getState().user
    userService.saveToken(token)

    const response = await userService.addToFavorites(username, operation)

    const type = response === 'add' ? 'ADD_TO_FAVORITES' : 'REMOVE_FROM_FAVORITES'

    dispatch({
      type,
      username
    })
  }
}