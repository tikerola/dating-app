import { createStore, combineReducers, applyMiddleware } from 'redux'
import usersReducer from '../reducers/user'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  user: usersReducer
})

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default store
