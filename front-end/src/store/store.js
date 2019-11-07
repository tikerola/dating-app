import { createStore, combineReducers, applyMiddleware } from 'redux'
import usersReducer from '../reducers/user'
import profilesReducer from '../reducers/profiles'
import searchReducer from '../reducers/search'
//import logger from 'redux-logger'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  user: usersReducer,
  profiles: profilesReducer,
  search: searchReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
