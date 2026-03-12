import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import API from "../api/axios"

function Login() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const { data } = await API.post("/auth/login", form)

      // store auth data
      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.role)

      // store user info (needed for cart per user)
      localStorage.setItem("user", JSON.stringify(data.user))

      alert("Login successful")

      if (data.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }

    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials")
    }
  }

  return (
    <div className="flex justify-center mt-20">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 border p-6 shadow"
      >

        <h2 className="text-2xl font-bold text-center">
          Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2"
          onChange={handleChange}
        />

        <button className="bg-orange-500 text-white p-2 rounded">
          Login
        </button>

        <p className="text-center text-sm">
          New User ?{" "}
          <Link to="/signup" className="text-orange-500">
            Signup
          </Link>
        </p>

      </form>

    </div>
  )
}

export default Login