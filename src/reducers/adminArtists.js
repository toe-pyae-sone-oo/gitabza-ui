import { LOAD_ADMIN_ARTISTS, LOAD_ADMIN_ARTIST_NAMES } from '../constants/actionTypes'

export default (state = { data: [], count: 0, names: [] }, action) => {
  switch (action.type) {
    case LOAD_ADMIN_ARTISTS:
      return {
        ...state,
        count: action.payload.count,
        data: [
          ...action.payload.data
        ],
      }
    case LOAD_ADMIN_ARTIST_NAMES:
      return {
        ...state,
        names: [
          ...action.payload
        ]
      }
    default:
      return state
  }
}