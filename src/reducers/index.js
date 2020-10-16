import { combineReducers } from 'redux'
import loading from './loading'
import error from './error'
import adminArtists from './adminArtists'
import adminSongs from './adminSongs'
import adminToken from './adminToken'

export default combineReducers({
  loading,
  error,
  adminArtists,
  adminSongs,
  adminToken,
})