import mailService from '../services/mail'

export const fetchInbox = () => {

  return async (dispatch, getState) => {

    const { token } = getState().user

    mailService.saveToken(token)
    const response = await mailService.fetchInbox()
    
    dispatch({
      type: 'FETCH_INBOX',
      inbox: response
    })
  }
}

export const fetchSent = () => {

  return async (dispatch, getState) => {

    const { token } = getState().user

    mailService.saveToken(token)
    const response = await mailService.fetchSent()
    
    dispatch({
      type: 'FETCH_SENT',
      sent: response
    })
  }
}