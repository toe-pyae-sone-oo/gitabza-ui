import { SAVE_ARTIST } from '../constants/actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case SAVE_ARTIST:
      return [
        ...state.filter(it => it.uuid !== action.payload.uuid),
        {
          ...action.payload
        }
      ]
    default:
      return state
  }
}