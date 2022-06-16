import {useEffect} from 'react'
import {CircularProgress} from '@mui/material'

import FilterHead from '../FilterHead/FilterHead'
import config from '../../config.json'
import getArrayApi from '../../api/getArray'
import useApi from '../../hooks/useApi'

const Table = ({style, filters, endpoint, title, width}) => {

  const {data, loading, request} = useApi(getArrayApi.getArray)

  useEffect(() => {handleGet()}, [])

  const handleGet = async () => {await request(endpoint)}

  console.log(data[0]['name'])
  return (
    <div style={{display: 'flex', flexDirection: 'column', backgroundColor: config.colors.text,
      padding: 30, borderRadius: 15, width: width, ...style}}
    >
      {/* Titre */}
      <div style={{fontSize: 50, fontWeight: 'bold', color: config.colors.primary,
        marginBottom: 20}}
      >
        {title}
      </div>
      {/* Filtres */}
      <div style={{display: 'flex', marginBottom: 20}}>
        {filters.map((elem, i) => (
          <FilterHead
            disabled={loading || data?.length === 0 || elem?.disabled}
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
          loading
          ?
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <CircularProgress sx={{color: config.colors.primary}} />
          </div>
          :
          data?.length === 0
          ?
          <div>No data</div>
          :
          data?.map((elem1, i1) => (
            <div
              key={i1}
              style={{display: 'flex', alignItems: 'center',
                marginBottom: i1 !== (data?.length - 1) ? 10 : 0}}
            >
              {filters.map((elem2, i2) => (
                <div key={i2} style={{width: elem2.width}}>
                  {elem1[i2] || '-'}
                </div>
              ))}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Table