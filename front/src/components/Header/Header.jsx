import {colors, borderRadius} from '../../config'
import './Header.scss'
import HeaderChoice from '../HeaderChoice/HeaderChoice'

const Header = () => {

  const choices = [
    {label: 'Tableaux', route: 'arrays'},
    {label: 'Mon compte', route: 'account'}
  ]

  return (
    <div
      id='headerContainer'
      style={{backgroundColor: colors.light, borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius, color: colors.primary}}
    >
      {choices.map(({label, route}, i) => (
        <HeaderChoice key={i} label={label} route={route} />
      ))}
    </div>
  )
}

export default Header