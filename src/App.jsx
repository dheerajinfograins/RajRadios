import { Route, Routes } from 'react-router'
import PublicRoute from './routes/PublicRoute'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Card from './pages/Cart'
import About from './pages/About'
import ProductDetails from './pages/ProductDeatil'
import RepairService from './pages/RepairService'
import CheckOut from './pages/CheckOut'
import SignUp from './pages/register'
import ProtectedRoute from './routes/PrivateRoute'
import Login from './pages/Login'


function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='login' element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="productdetails" element={<ProductDetails />} />
          <Route path="repairservice" element={<RepairService />} />
          <Route path="card" element={<Card />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
