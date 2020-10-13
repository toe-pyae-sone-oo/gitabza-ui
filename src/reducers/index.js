import { combineReducers } from 'redux'
import loading from './loading'
import adminArtists from './adminArtists'
import adminSongs from './adminSongs'

export default combineReducers({
  loading,
  adminArtists,
  adminSongs,
})