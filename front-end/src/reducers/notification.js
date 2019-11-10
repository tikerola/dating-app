
export default (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message

    default:
      return state
  }
}