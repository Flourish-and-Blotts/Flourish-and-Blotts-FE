import { Routes, Route } from 'react-router-dom'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import { ROUTER_PATH } from './configure/routerPath'
import Login from './pages/Login'

const App = () => {
  return (
    <Routes>
      <Route path={ROUTER_PATH.USER} element={<UserPage />} />
      <Route path={ROUTER_PATH.ADMIN} element={<AdminPage />} />  {/* 404 Page */}
      <Route path={ROUTER_PATH.LOGIN} element={<Login />} />  {/* 404 Page */}
    </Routes>
  )
}

export default App
