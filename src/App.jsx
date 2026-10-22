import Shop from './Shop.jsx'
import Cart from './Cart.jsx'
import Admin from './Admin.jsx'
import { Route, Routes } from 'react-router'


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Admin" element={<Admin />} />
    </Routes>
    </>
  )
}

export default App
