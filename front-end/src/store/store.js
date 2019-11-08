import { createStore, combineReducers, applyMiddleware } from 'redux'
import usersReducer from '../reducers/user'
import profilesReducer from '../reducers/profiles'
import searchReducer from '../reducers/search'
import mailReducer from '../reducers/mail'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  user: usersReducer,
  profiles: profilesReducer,
  search: searchReducer,
  mail: mailReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store
