export const validator = {
  name: name => (!!name && !!name.trim()) ? '' : 'name is required',
  slug: slug => (!!slug && !!slug.trim()) ? '' : 'slug is required',
}