import apiClient from './client'

const auth = (status, body) => {
  return (
    apiClient.post('/auth/' + status, body)
  )
}

export default {auth}