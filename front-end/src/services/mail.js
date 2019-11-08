
import axios from 'axios'

let token
const baseUrl = '/api/messages'

const saveToken = tokenToSave => {
  token = 'bearer ' + tokenToSave
}

const fetchInbox = async () => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.get(`${baseUrl}/inbox`, config)
  return response.data
}

const fetchSent = async () => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.get(`${baseUrl}/sent`, config)
  return response.data
}


export default { fetchInbox, fetchSent, saveToken }