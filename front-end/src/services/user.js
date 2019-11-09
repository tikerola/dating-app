import axios from 'axios'

let token
const baseUrl = '/api/user'

const saveToken = tokenToSave => {
  token = 'bearer ' + tokenToSave
}

const signup = async (data) => {
  const response = await axios.post(`${baseUrl}/signup`, data)
  return response.data
}

const login =  async (data) => {
  const response = await axios.post(`${baseUrl}/login`, data)
  return response.data
}

const edit = async profileText => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(`${baseUrl}/edit`, profileText, config)
  return response.data

}

export default { signup, login, edit, saveToken }