import { SET_ERROR } from '../constants/actionTypes'

export default (state = false, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload
    default:
      return state
  }
}