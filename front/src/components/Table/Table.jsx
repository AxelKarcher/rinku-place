import {useState, useEffect} from 'react'
import AddIcon from '@mui/icons-material/Add'

import FilterHead from '../FilterHead/FilterHead'
import config, {marginVertical} from '../../config.js'
import getArray from '../../api/getArray'
import useApi from '../../hooks/useApi'
import TableElem from '../TableElem/TableElem'
import Button from '../Button/Button'
import ManageTableModal from '../ManageTableModal/ManageTableModal'
import Title from '../Title/Title'
import Spinner from '../Spinner/Spinner'
import './Table.scss'

const Table = ({style, filters, endpoint, title, width}) => {

  const [isModal, setIsModal] = useState(false)
  const [needRefresh, setNeedRefresh] = useState(false)
  const [preData, setPreData] = useState()
  const [usedData, setUsedData] = useState()
  const [lastSort, setLastSort] = useState('')
  const [isTimeout, setIsTimeout] = useState(false)
  const [checkTimeout, setCheckTimeout] = useState(false)

  const {data, loading, request, error} = useApi(getArray.getArray)

  useEffect(() => {handleGet()}, [])

  useEffect(() => {
    if (data !== undefined) {
      setUsedData(data)
    }
  }, [data])

  useEffect(() => {
    if (needRefresh) {
      handleGet()
      setNeedRefresh(false)
    }
  }, [needRefresh])

  useEffect(() => {if (preData !== undefined) {setIsModal(true)}}, [preData])

  useEffect(() => {
    if (!checkTimeout) {return}
    if (data === undefined) {setIsTimeout(true)}
  }, [checkTimeout])

  const handleGet = async () => {
    setTimeout(() => {setCheckTimeout(true)}, 5000)
    await request(endpoint)
  }

  const handleCloseModal = () => {
    setIsModal(false)
    setPreData(undefined)
  }

  const handleSort = (type) => {
    let newUsedData = [...usedData]

    newUsedData = usedData.sort((a, b) =>
      (a[type] > b[type]) ? 1 : ((b[type] > a[type]) ? -1 : 0))

    if (lastSort === '' || lastSort !== type) {
      setLastSort(type)
      setUsedData(newUsedData)
    } else if (lastSort === type) {
      setUsedData([...newUsedData].reverse())
      setLastSort('')
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: width,
      backgroundColor: config.colors.light, padding: config.padding,
      borderRadius: config.borderRadius, marginTop: marginVertical * 2,
      marginBottom: marginVertical * 2, ...style}}
    >
      <ManageTableModal
        isOn={isModal}
        handleClose={() => handleCloseModal()}
        filters={filters}
        refreshSetter={() => setNeedRefresh(true)}
        endpoint={endpoint}
        preData={preData}
      />
      {/* Titre */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',
       marginBottom: config.titleMarginBottom}}
      >
        <Title label={title} />
        <Button icon={<AddIcon />} action={() => setIsModal(true)} disabled={loading} />
      </div>
      {/* Filtres */}
      <div style={{display: 'flex', justifyContent: 'space-between', padding: 5}}>
        {filters.map((elem, i) => (
          <FilterHead
            style={{backgroundColor: elem.color}}
            disabled={loading || data?.length === 0 || elem?.disabled}
            action={() => handleSort(elem.field)}
            width={elem.width}
            key={i}
            label={elem.label}
            notSortable={elem.notSortable}
          />
        ))}
      </div>
      {/* Valeurs */}
      <div>
        {
          isTimeout
          ?
          <div style={{display: 'flex', justifyContent: 'center'}}>Timeout</div>
          :
          loading
          ?
          <Spinner />
          :
          data?.length === 0
          ?
          <div style={{display: 'flex', justifyContent: 'center'}}>Rien à afficher</div>
          :
          usedData?.map((elem1, i1) => (
            <div
              key={i1}
              style={{marginBottom: i1 !== (usedData?.length - 1) ? 5 : 0,
                borderRadius: config.borderRadius, padding: 5}}
              className='tableRow'
              onClick={() => setPreData(elem1)}
            >
              {filters.map((elem2, i2) => (
                <TableElem
                  style={{backgroundColor: elem2.color}}
                  key={i2}
                  data={elem1[elem2?.field] || '-'}
                  width={elem2.width}
                  type={elem2.field}
                />
              ))}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Table