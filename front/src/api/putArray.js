import apiClient from './client'

const putArray = (type, body) => {
  return (
    apiClient.put('/put/array/' + type, body)
  )
}

export default {putArray}