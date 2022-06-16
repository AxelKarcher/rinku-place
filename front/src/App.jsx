import {useState, useEffect} from 'react'

import './App.scss'
import config from './config.json'
import Button from './components/Button/Button'
import TextField from './components/TextField/TextField'
import useApi from './hooks/useApi'
import deleteApi from './api/delete'
import putApi from './api/put'
import updateApi from './api/update'
import Table from './components/Table/Table'

const App = () => {

  const {loading: deleteLoad, request: deleteReq} = useApi(deleteApi.deleteApi)
  const {loading: putLoad, request: putReq} = useApi(putApi.putApi)
  const {loading: updateLoad, request: updateReq} = useApi(updateApi.updateApi)

  const [str, setStr] = useState('')
  const [loading, setLoading] = useState(false)
  const [entryInfos, setEntryInfos] = useState({})

  // useEffect(() => {handleGet()}, [])

  useEffect(() => {
    setLoading(deleteLoad || putLoad || updateLoad)
  }, [deleteLoad, putLoad])

  // const handlePut = async () => {
  //   // {name: 'Monster House', out: '2006', seen: 'Pre-2012', universe: '', score: 'vg'}
  //   await putReq({label: str})

  //   setStr('')
  //   handleGet()
  // }

  // const handleDelete = async (id) => {
  //   await deleteReq(id)
  //   handleGet()
  // }

  // const handleUpdate = async (id) => {
  //   await updateReq(id)
  //   handleGet()
  // }

  const filters = [
    {label: 'Nom', field: 'name', width: '30%'},
    {label: 'Année de sortie', field: 'out', width: '30%'},
    {label: 'Vue en', field: 'seen', width: '15%'},
    {label: 'Univers', field: 'universe', width: '20%'},
    {label: 'Mention', field: 'score', width: '10%'}
  ]

  return (
    <div id='appContainer' style={{backgroundColor: config.colors.background}}>
      {/*
        <div style={{display: 'flex', marginBottom: 20}}>
          <TextField
            value={str}
            setter={setStr}
            style={{marginRight: 20}}
            action={() => handleGet()}
          />
          <Button
            disabled={str === ''}
            style={{marginRight: 20}}
            label='POST'
            action={() => handlePut()}
          />
          <Button label='GET' action={() => handleGet()} />
        </div>
      */}
      <Table
        filters={filters}
        endpoint='films'
        title='Suivi de films'
        width='60%'
      />
    </div>
  )
}

export default App
