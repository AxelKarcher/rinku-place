import StarRatings from 'react-star-ratings'

import config from '../../config.js'

const TableElem = ({data, type, width, style}) => {

  const renderData = () => {
    switch (type) {
      case 'note': return (
        <div style={{pointerEvents: 'none'}}>
          <StarRatings
            rating={data}
            starRatedColor={config.colors.primary}
            starEmptyColor='grey'
            numberOfStars={5}
            starDimension='20px'
            starSpacing='1px'
          />
        </div>
      )
      default:
        return data
    }
  }

  return (
    <div style={{width: width, ...style}}>
      <div style={{paddingLeft: 5}}>{renderData()}</div>
    </div>
  )
}

export default TableElem