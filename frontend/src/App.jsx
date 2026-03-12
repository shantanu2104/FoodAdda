import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Success from "./pages/Success"
import AdminDashboard from "./admin/AdminDashboard"
import AddFood from "./admin/AddFood"
import ManageFood from "./admin/ManageFood"
import Orders from "./pages/Orders"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />w
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-food" element={<AddFood />} />
        <Route path="/admin/manage-food" element={<ManageFood />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App