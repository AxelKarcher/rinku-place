import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'

import ArrayPage from './pages/ArrayPage/ArrayPage'
import AuthPage from './pages/AuthPage/AuthPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import './App.scss'
import {colors} from '../src/config.js'

// recherche d'un film
// bordures du Select

const App = () => {

  const routes = [
    {path: '/', elem: <Navigate replace to='/auth' />},
    {path: '/auth', elem: <AuthPage />},
    {path: '/arrays', elem: <ArrayPage />},
    {path: '*', elem: <NotFoundPage />}
  ]

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div id='appContainer' style={{backgroundColor: colors.background}}>
        <BrowserRouter>
          <Routes>
            {routes.map(({path, elem}, i) => (
              <Route key={i} path={path} element={elem} />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  )
}

export default App
