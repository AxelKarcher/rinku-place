import apiClient from './client'

const getArray = (token, dataField) => {
  return (
    apiClient.get('/' + dataField + '/get', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    )
  )
}

export default {getArray}