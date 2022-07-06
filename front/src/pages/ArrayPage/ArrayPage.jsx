import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import Table from '../../components/Table/Table'
import Container from '../../components/Container/Container'

const ArrayPage = () => {

  const filters = [
    {label: 'Nom', field: 'name', width: '30%'},
    {label: 'Année de sortie', type: 'date', field: 'out', width: '17%'},
    {label: 'Vue en', field: 'seen', type: 'date', width: '12%'},
    {label: 'Univers', field: 'universe', optional: true, width: '15%'},
    {label: 'Note', field: 'note', width: '12%'}
  ]

  const navigate = useNavigate()

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('token'))) {navigate('/auth')}
  }, [])

  return (
    <Container headerOnPage>
      <Table
        filters={filters}
        dataField='films'
        title='Films'
        width='60%'
      />
    </Container>
  )
}

export default ArrayPage