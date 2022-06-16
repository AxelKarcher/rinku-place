import apiClient from './client'

const deleteApi = (label) => {
  return (
    apiClient.delete('/delete/' + label)
  )
}

export default {deleteApi}