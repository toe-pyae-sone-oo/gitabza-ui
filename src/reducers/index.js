import { combineReducers } from 'redux'
import songs from './songs'
import loading from './loading'

export default combineReducers({
  songs,
  loading,
})