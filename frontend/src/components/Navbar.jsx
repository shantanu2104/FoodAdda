import { Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

function Navbar() {

  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setToken(localStorage.getItem("token"))
    setRole(localStorage.getItem("role"))
  }, [location]) // runs whenever route changes

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")

    setToken(null)
    setRole(null)

    navigate("/")
  }

  return (
    <nav className="bg-orange-500 text-white p-4 flex justify-between">

      <Link to="/" className="text-xl font-bold">
        FoodAdda
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        {token && <Link to="/cart">Cart</Link>}

        {role === "admin" && <Link to="/admin">Admin</Link>}

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="bg-white text-orange-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  )
}

export default Navbar