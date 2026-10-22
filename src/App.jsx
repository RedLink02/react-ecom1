import Shop from './Shop.jsx'
import Cart from './Cart.jsx'
import Admin from './Admin.jsx'
import AdminLogin from './AdminLogin.jsx'
import AdminRoute from './AdminRoute.jsx'
import NotFound from './NotFound.jsx'
import { Route, Routes } from 'react-router'


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
