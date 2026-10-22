import Shop from './Shop.jsx'
import Cart from './Cart.jsx'
import Checkout from './Checkout.jsx'
import Admin from './Admin.jsx'
import AdminLogin from './AdminLogin.jsx'
import AdminRoute from './AdminRoute.jsx'
import NotFound from './NotFound.jsx'
import { Route, Routes } from 'react-router'
import Success from './Success.jsx'
import ProductPage from './ProductPage.jsx'


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success/>}/>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
