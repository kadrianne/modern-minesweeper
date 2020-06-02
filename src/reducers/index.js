import { combineReducers } from 'redux'
import loggedInUser from './loggedInUserReducer'
import userLoggedIn from './userLoggedInReducer'

export default combineReducers({ loggedInUser, userLoggedIn })