import axios from 'axios'

const baseUrl = '/api'

const signup = async (data) => {
  const response = await axios.post(`${baseUrl}/signup`, data)
  return response.data
}

const login =  async (data) => {
  const response = await axios.post(`${baseUrl}/login`, data)
  return response.data
}

export default { signup, login }