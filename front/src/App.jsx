import {useState, useEffect} from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import {CircularProgress} from '@mui/material'

import './App.scss'
import config from './config.json'
import Button from './components/Button/Button'
import TextField from './components/TextField/TextField'

const App = () => {

  const [str, setStr] = useState('')
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {testGet()}, [])

  const testPut = async () => {
    setLoading(true)
    await axios.put('http://localhost:8080/put', {label: str}).then(
      (res) => console.log('putRes:', res))

    setLoading(false)
    setStr('')
    testGet()
  }

  const testGet = async () => {
    setLoading(true)
    await axios.get('http://localhost:8080/get').then((res) => setData(res?.data))
    setLoading(false)
  }

  const testDelete = async (label) => {
    setLoading(true)
    await axios.delete('http://localhost:8080/delete/' + label).then(
      (res) => console.log('deleteRes:', res))

    setLoading(false)
    testGet()
  }

  return (
    <div id='appContainer' style={{backgroundColor: config.colors.background}}>
      <div style={{display: 'flex', marginBottom: 20}}>
        <TextField
          value={str}
          setter={setStr}
          style={{marginRight: 20}}
          action={() => testGet()}
        />
        <Button
          disabled={str === ''}
          style={{marginRight: 20}}
          label='POST'
          action={() => testPut()}
        />
        <Button
          label='GET'
          action={() => testGet()}
        />
      </div>
      <div className='panel' style={{fontSize: 40}}>
        {
          loading
          ?
          <CircularProgress sx={{color: config.colors.primary}} />
          :
          data?.length === 0
          ?
          <div>No data</div>
          :
          data?.map((elem, i) => (
            <div
              key={i}
              style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: i !== (data.length - 1) ? 20 : 0}}
            >
              <div style={{marginRight: 30}}>{elem.label}</div>
              <DeleteIcon
                style={{cursor: 'pointer', fontSize: 40}}
                onClick={() => testDelete(elem.label)}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
