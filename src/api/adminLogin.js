import { httpClient } from './config'

export const login = payload => {
  return httpClient.post('/admin/login', payload)
    .then(({ data }) => data)
}