
import axios from 'axios'

let token
const baseUrl = '/api/profiles'

const saveToken = tokenToSave => {
  token = 'bearer ' + tokenToSave
}

const searchProfiles = async (searchOptions) => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(`${baseUrl}/search`, searchOptions, config)
  return response.data
}


export default { searchProfiles, saveToken }