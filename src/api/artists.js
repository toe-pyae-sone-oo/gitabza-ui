import httpClient from './config'

export const create = payload => {
  return httpClient.post('/artists', payload)
    .then(({ data }) => data)
}

export const upload = file => {
  const formData = new FormData()
  formData.append('picture', file, file.name)
  return httpClient.post('/artists/upload/pic', formData)
    .then(({ data }) => data)
}

export const find = ({ name = undefined, skip = 0, limit = 10 }) => {
  let query = name ? `name=${name.trim()}&` : ''
  query += `skip=${skip}&`
  query += `limit=${limit}`

  return httpClient.get(`/artists?${query}`)
    .then(({ data }) => data)
}