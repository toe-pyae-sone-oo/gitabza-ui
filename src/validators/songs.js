const validator = {
  title: title => (!!title && !!title.trim()) ? '' : 'title is required',
  slug: slug => (!!slug && !!slug.trim()) ? '' : 'slug is required',
  artist: artist => (!!artist && !!artist.trim()) ? '' : 'artist is required',
}

export const validate = form => Object.keys(validator)
  .map(key => ({ [key]: validator[key](form[key]) }))
  .reduce((a, b) => ({ ...a, ...b }), {})