import { httpClient, adminAuthHeader } from './config'

export const create = payload => {
  return httpClient
    .post('/songs', payload, adminAuthHeader())
    .then(({ data }) => data)
}

export const find = ({ title = undefined, skip = 0, limit = 10 }) => {
  let query = title ? `title=${title.trim()}&` : ''
  query += `skip=${skip}&`
  query += `limit=${limit}`
  return httpClient
    .get(`/songs?${query}`)
    .then(({ data }) => data)
}

export const remove = id => {
  return httpClient.delete(`/songs/${id}`, adminAuthHeader())
}

export const findById = id => {
  return httpClient
    .get(`/songs/${id}`)
    .then(({ data }) => data)
}

export const update = (id, payload) => {
  return httpClient
    .put(`/songs/${id}`, payload, adminAuthHeader())
    .then(({ data }) => data)
}