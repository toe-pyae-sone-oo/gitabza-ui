import { SET_ADMIN_TOKEN } from '../constants/actionTypes'

export default (state = '', action) => {
  switch (action.type) {
    case SET_ADMIN_TOKEN:
      return action.payload
    default:
      return state
  }
}