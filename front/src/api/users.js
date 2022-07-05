import apiClient from './client'

const users = (status, body) => {
  return (
    apiClient.post('/users/' + status, body)
  )
}

export default {users}