import { LOAD_ADMIN_SONGS } from '../constants/actionTypes'

export default (state = { count: 0, data: [] }, action) => {
  switch (action.type) {
    case LOAD_ADMIN_SONGS:
      return {
        count: action.payload.count,
        data: [...action.payload.data]
      }
    default:
      return state
  }
}