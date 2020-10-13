import { validator as artistValidator } from './artists'

const validate = validator => form => Object.keys(validator)
  .map(key => ({ [key]: validator[key](form[key]) }))
  .reduce((a, b) => ({ ...a, ...b }), {})

export const validateArtistForm = validate(artistValidator)
