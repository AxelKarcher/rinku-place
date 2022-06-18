import apiClient from './client'

const deleteArray = (id) => {
  return (
    apiClient.delete('/delete/array/' + id)
  )
}

export default {deleteArray}