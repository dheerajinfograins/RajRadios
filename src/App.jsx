import { Route, Routes } from 'react-router'
import PublicRoute from './routes/PublicRoute'
import Home from './pages/user/Home'
import Contact from './pages/user/Contact'
import Shop from './pages/user/Shop'
import Card from './pages/user/Cart'
import About from './pages/user/About'
import RepairService from './pages/user/RepairService'
import CheckOut from './pages/user/CheckOut'
import SignUp from './pages/user/register'
import ProtectedRoute from './routes/PrivateRoute'
import Wishlist from './pages/user/Wishlist'
import Login from './pages/user/Login'
import Profile from './pages/user/Profile'
import OrderHistory from './pages/user/OrderHistory'
import TrackOrder from './pages/user/TrackOrder'

// Admin Imports
import AdminRoute from './routes/AdminRoute'
import Dashboard from './pages/admin/Dashboard'
import ProductsManager from './pages/admin/ProductsManager'
import OrdersManager from './pages/admin/OrdersManager'
import UsersManager from './pages/admin/UsersManager'
import RepairsManager from './pages/admin/RepairsManager'
import ContactsManager from './pages/admin/ContactsManager'

function App() {

  return (
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
        <Route path="repairservice" element={<RepairService />} />
        <Route path="card" element={<Card />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<OrderHistory />} />
        <Route path="track-order" element={<TrackOrder />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductsManager />} />
        <Route path="orders" element={<OrdersManager />} />
        <Route path="users" element={<UsersManager />} />
        <Route path="repairs" element={<RepairsManager />} />
        <Route path="contacts" element={<ContactsManager />} />
      </Route>

    </Routes>
  )
}

export default App
