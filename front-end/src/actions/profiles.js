import profilesService from '../services/profiles'

export const searchProfiles = (searchOptions) => {

  return async (dispatch, getState) => {

    const { token } = getState().user

    profilesService.saveToken(token)
    const response = await profilesService.searchProfiles(searchOptions)

    dispatch({
      type: 'SEARCH_PROFILES',
      profiles: response
    })

  }
}