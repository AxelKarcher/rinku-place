import './App.scss'
import config from './config.json'
import Table from './components/Table/Table'

// bordures du Select
// recherche d'un film
// changer rentrée de la note

const App = () => {

  const filters = [
    {label: 'Nom', field: 'name', width: '30%'},
    {label: 'Année de sortie', type: 'date', field: 'out', width: '17%'},
    {label: 'Vue en', field: 'seen', type: 'date', width: '12%'},
    {label: 'Univers', field: 'universe', optional: true, width: '15%'},
    {label: 'Note', field: 'note', width: '12%'}
  ]

  return (
    <div id='appContainer' style={{backgroundColor: config.colors.background}}>
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
