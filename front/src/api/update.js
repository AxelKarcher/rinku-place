import apiClient from './client'

const updateApi = (id, body) => {
  return (
    apiClient.patch('/update/' + id, {label:'MODIFIED'})
  )
}

export default {updateApi}