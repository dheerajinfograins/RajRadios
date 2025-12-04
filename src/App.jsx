import { Route, Routes } from 'react-router'
import PublicRoute from './routes/PublicRoute'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import About from './pages/About'
import ProductDetail from './pages/ProductDeatil'
import RepairService from './pages/RepairService'
import CheckOut from './pages/CheckOut'
import { Login, SignUp } from './pages/Login'
import PrivateRoute from './routes/PrivateRoute'

function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path='/' element={<PrivateRoute />}>
          <Route path="/productdetails" element={<ProductDetail />} />
          <Route path="/repairservice" element={<RepairService />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Route>

      </Routes>



    </>
  )
}

export default App
