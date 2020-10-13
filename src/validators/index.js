import { validator as artistValidator } from './artists'
import { validator as songValidator } from './songs'

const validate = validator => form => Object.keys(validator)
  .map(key => ({ [key]: validator[key](form[key]) }))
  .reduce((a, b) => ({ ...a, ...b }), {})

export const validateArtistForm = validate(artistValidator)

export const validateSongForm = validate(songValidator)
