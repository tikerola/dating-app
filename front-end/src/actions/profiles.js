import profilesService from '../services/profiles'
import { setSearch } from './search'

export const searchProfiles = (searchOptions) => {

  return async (dispatch, getState) => {

    const { token } = getState().user

    profilesService.saveToken(token)
    const response = await profilesService.searchProfiles(searchOptions)

    if (response.count >= 0)
      dispatch(setSearch({ ...searchOptions, profileCount: response.count }))
    else
      dispatch(setSearch(searchOptions))

    dispatch({
      type: 'SEARCH_PROFILES',
      profiles: response.profiles
    })
  }
}