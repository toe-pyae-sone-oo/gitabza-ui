export const validator = {
  title: title => (!!title && !!title.trim()) ? '' : 'title is required',
  slug: slug => (!!slug && !!slug.trim()) ? '' : 'slug is required',
  artists: artists => (artists.length > 0) ? '' : 'artists is required',
}