import { combineReducers } from 'redux'
import songs from './songs'
import loading from './loading'
import artists from './artists'

export default combineReducers({
  songs,
  loading,
  artists,
})