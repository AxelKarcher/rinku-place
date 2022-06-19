import Table from '../../components/Table/Table'
import './ArrayPage.scss'

const ArrayPage = () => {

  const filters = [
    {label: 'Nom', field: 'name', width: '30%'},
    {label: 'Année de sortie', type: 'date', field: 'out', width: '17%'},
    {label: 'Vue en', field: 'seen', type: 'date', width: '12%'},
    {label: 'Univers', field: 'universe', optional: true, width: '15%'},
    {label: 'Note', field: 'note', width: '12%'}
  ]

  return (
    <div id='arrayPageContainer'>
      <Table
        filters={filters}
        endpoint='films'
        title='Suivi de films'
        width='60%'
      />
    </div>
  )
}

export default ArrayPage