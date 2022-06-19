import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const FilterHead = ({label, width, notSortable, action, disabled, style}) => {
  return (
    <div
      style={{display: 'flex', alignItems: 'center', color: disabled ? 'grey' : 'black',
        cursor: disabled || notSortable ? 'default' : 'pointer', width: width,
        fontWeight: 'bold', ...style}}
      onClick={action}
    >
      {
        (notSortable === undefined || !notSortable) &&
        <div style={{display: 'flex', flexDirection: 'column', marginRight: 3,
          paddingTop: 11}}
        >
          <KeyboardArrowUpIcon />
          <KeyboardArrowDownIcon style={{position: 'relative', top: -10}}/>
        </div>
      }
      {label}
    </div>
  )
}

export default FilterHead