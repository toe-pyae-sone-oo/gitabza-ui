import { LOAD_ADMIN_ARTISTS } from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_ADMIN_ARTISTS:
      return {
        count: action.payload.count,
        data: [
          ...action.payload.data
        ],
      }
    default:
      return state
  }
}