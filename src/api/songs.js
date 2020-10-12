import httpClient from './config'

export const create = payload => {
  return httpClient.post('/songs', payload)
    .then(({ data }) => data)
}