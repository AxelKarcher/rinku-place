import { useState } from 'react'

const useApi = (apiFunc) => {

  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const request = async (...args) => {
    setLoading(true)
    const res = await apiFunc(...args)
    setError(res.error)
    setData(res.data)
    setLoading(false)
    return res
  }

  return {data, loading, request, error}
}

export default useApi