import RtStar from 'react-rtstar'

import config from '../../config.json'

const TableElem = ({data, type, width, style}) => {

  const renderData = () => {
    switch (type) {
      case 'note': return (
        <div style={{pointerEvents: 'none'}}>
          <RtStar
            stars={5}
            activeColor={config.colors.primary}
            inactiveColor='grey'
            value={data}
            size={20}
          />
        </div>
      )
      default:
        return data
    }
  }

  return (
    <div style={{width: width, ...style}}>
      <div style={{paddingLeft: 10}}>{renderData()}</div>
    </div>
  )
}

export default TableElem