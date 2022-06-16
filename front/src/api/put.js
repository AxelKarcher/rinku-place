import apiClient from './client'

const putApi = (body) => {
  return (
    apiClient.put('/put/films', body)
  )
}

export default {putApi}