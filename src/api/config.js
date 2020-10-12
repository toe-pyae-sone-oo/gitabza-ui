import axios from 'axios'
import { API_URL } from '../constants/api'
import { SET_LOADING } from '../constants/actionTypes'
import { store } from '../store'

const startLoading = store => store.dispatch({ type: SET_LOADING, loading: true })
const stopLoading = store => store.dispatch({ type: SET_LOADING, loading: false })

const httpClient = axios.create({
  baseURL: API_URL
})

httpClient.interceptors.request.use(config => {
  startLoading(store)
  return config
})

httpClient.interceptors.response.use(
  res => {
    stopLoading(store)
    return res
  },
  err => {
    stopLoading(store)
    
    if (err.response && err.response.status === 422) { 
      throw err 
    }

    // TODO: handle error
    throw err
  })

export default httpClient