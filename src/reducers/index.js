import { combineReducers } from 'redux'
import loggedInUser from './loggedInUserReducer'
import userLoggedIn from './userLoggedInReducer'
import userLoggedOut from './userLoggedOutReducer'
import userScores from './userScoresReducer'
import scoreFormOpen from './scoreFormOpenReducer'

export default combineReducers({ loggedInUser, userLoggedIn, userLoggedOut, userScores, scoreFormOpen })