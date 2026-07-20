import { Route, Routes } from 'react-router'
import PublicRoute from './routes/PublicRoute'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Card from './pages/Cart'
import About from './pages/About'
import RepairService from './pages/RepairService'
import CheckOut from './pages/CheckOut'
import SignUp from './pages/register'
import ProtectedRoute from './routes/PrivateRoute'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Profile from './pages/Profile'
import OrderHistory from './pages/OrderHistory'
import TrackOrder from './pages/TrackOrder'

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
