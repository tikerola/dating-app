
const initialState = {
  age: [],
  gender: '',
  page: 0,
  limit: 12,
  nextPage: false,
  prevPage: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}