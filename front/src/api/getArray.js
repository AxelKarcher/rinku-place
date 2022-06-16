import apiClient from './client'

const getArray = (type) => {
  return (
    apiClient.get('/get/' + type)
  )
}

export default {getArray}