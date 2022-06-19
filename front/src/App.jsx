import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import ArrayPage from './pages/ArrayPage/ArrayPage'
import AuthPage from './pages/AuthPage/AuthPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import './App.scss'
import config from '../src/config.json'

// NotFoundPage archi pour grand bouton ok ? (div alone)
// recherche d'un film
// bordures du Select

const App = () => {

  const routes = [
    {path: '/', elem: <Navigate replace to='/auth' />},
    {path: '/auth', elem: <AuthPage />},
    {path: '/arrays', elem: <ArrayPage />},
    {path: '*', elem: <NotFoundPage />}
  ]

  return (
    <div id='appContainer' style={{backgroundColor: config.colors.background}}>
      <BrowserRouter>
        <Routes>
          {routes.map(({path, elem}, i) => (
            <Route key={i} path={path} element={elem} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
