import {useState, useEffect} from 'react'
import {Modal} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'

import './ManageTableModal.scss'
import config from '../../config.json'
import Title from '../Title/Title'
import TextField from '../TextField/TextField'
import Button from '../Button/Button'
import Spinner from '../Spinner/Spinner'
import putArray from '../../api/putArray'
import useApi from '../../hooks/useApi'
import updateArray from '../../api/updateArray'
import deleteArray from '../../api/deleteArray'
import Slider from '../Slider/Slider'

const ManageTableModal = ({isOn, handleClose, preData, filters,
  refreshSetter, endpoint}) => {

  const [infos, setInfos] = useState()
  const [isOneNotOk, setIsOneNotOk] = useState(true)
  const [preId, setPreId] = useState()
  const [toConfirm, setToConfirm] = useState(false)

  const {request: putReq, loading: putLoad} = useApi(putArray.putArray)
  const {request: updReq, loading: updLoad} = useApi(updateArray.updateArray)
  const {request: delReq, loading: delLoad} = useApi(deleteArray.deleteArray)

  useEffect(() => {
    if (preData !== undefined) {return}

    let newInfos = {}

    filters.map((elem) => (
      newInfos = {...newInfos, [elem.field]: ''}
    ))
    setInfos(newInfos)
  }, [isOn])

  useEffect(() => {
    if (infos === undefined) {return}

    let newIsOneNotOk = false

    filters?.map((elem) => {
      if (!elem.optional) {
        if (infos[elem.field] === '') {newIsOneNotOk = true}
        if (elem.type === 'date' && (infos[elem.field]?.length !== 4 &&
          infos[elem.field]?.length !== 8)) {
          newIsOneNotOk = true
        }
      }
    })
    setIsOneNotOk(newIsOneNotOk)
  }, [infos])

  useEffect(() => {
    if (preData === undefined) {return}

    let newInfos = {...infos}

    for (let elem in preData) {
      if (elem === '_id') {
        setPreId(preData[elem])
      } else {
        newInfos[elem] = preData[elem]
      }
    }
    setInfos(newInfos)
  }, [preData])

  const handleInfos = (i, data) => {
    let newInfos = {...infos}

    newInfos[Object.keys(infos)[i]] = data
    setInfos(newInfos)
  }

  const preClose = () => {
    setPreId(undefined)
    setToConfirm(false)
    handleClose()
  }

  const handleConfirm = async (isForDelete) => {
    if (isForDelete) {
      await delReq(preId)
    } else {
      if (preData === undefined) {
        await putReq(endpoint, infos)
      } else {
        await updReq(endpoint, preId, infos)
      }
    }
    refreshSetter()
    preClose()
  }

  const renderData = (elem, i) => {
    switch (elem?.field) {
      case 'note': return (
        <Slider
          value={infos[Object.keys(infos)[i]]}
          action={(e) => handleInfos(i, e)}
          disabled={toConfirm}
          label={elem.label}
          max={5}
          min={0}
          step={0.5}
        />
      )
      default: return (
        <TextField
          disabled={toConfirm}
          value={infos[Object.keys(infos)[i]]}
          isOptional={elem.optional}
          label={elem.label}
          action={(e) => handleInfos(i, e)}
        />
      )
    }
  }

  return (
    <Modal
      open={isOn}
      onClose={preClose}
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    >
      <div
        id='manageTableModalContainer'
        style={{backgroundColor: config.colors.light, padding: config.padding,
          borderRadius: config.borderRadius}}
      >
        <Title
          style={{marginBottom: config.titleMargiBottom}}
          label={(toConfirm ? 'Supprimer' : preData ?
            'Modifier' : 'Ajouter') + ' une ligne'}
        />
        <div id='modalGrid' style={{marginBottom: config.titleMargiBottom}}>
          {
            infos === undefined
            ?
            <Spinner />
            :
            filters?.map((elem, i) => (<div key={i}>{renderData(elem, i)}</div>))
          }
        </div>
        {/* Boutons du bas */}
        <div>
          {
            putLoad || updLoad || delLoad
            ?
            <Spinner />
            :
            <div style={{display: 'flex'}}>
              {
                toConfirm
                ?
                // Boutons de confirmation
                <>
                  <Button
                    style={{marginRight: 20}}
                    icon={<CloseIcon />}
                    action={() => setToConfirm(false)}
                  />
                  <Button
                    icon={<DeleteIcon />}
                    action={() => handleConfirm(true)}
                  />
                </>
                :
                // Boutons de base
                <>
                  <Button
                    disabled={isOneNotOk}
                    style={{marginRight: 20}}
                    icon={<CheckIcon />}
                    action={() => handleConfirm(false)}
                  />
                  <Button
                    style={{marginRight: preData ? 20 : 0}}
                    icon={<CloseIcon />}
                    action={handleClose}
                  />
                  {
                    preData &&
                    <Button
                      icon={<DeleteIcon />}
                      action={() => setToConfirm(true)}
                    />
                  }
                </>
              }
            </div>
          }
        </div>
      </div>
    </Modal>
  )
}

export default ManageTableModal