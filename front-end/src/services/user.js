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

const addProfileImage = async file => {

  const data = new FormData()
  data.append('file', file, file.name)

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    },
  }

  const response = await axios.post(`${baseUrl}/image`, data, config)
  return response.data
}

const addToFavorites = async (username, operation) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(`${baseUrl}/addToFavorites`, { username, operation }, config)
  return response.data
}


export default { signup, login, edit, addProfileImage, addToFavorites, saveToken }