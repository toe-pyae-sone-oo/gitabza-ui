import { SAVE_SONG } from '../constants/actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case SAVE_SONG:
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