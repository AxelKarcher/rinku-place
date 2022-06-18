import apiClient from './client'

const updateArray = (endpoint, id, body) => {
  return (
    apiClient.patch('/update/array/' + endpoint + '/' + id, body)
  )
}

export default {updateArray}