import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../api/axios"

function Signup() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const { data } = await API.post("/auth/register", form)

      localStorage.setItem("token", data.token)

      alert("Account created")

      window.location.href = "/"

    } catch (error) {
      alert("Signup failed")
    }

  }

  return (
    <div className="flex justify-center mt-20">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 border p-6 shadow"
      >

        <h2 className="text-2xl font-bold text-center">
          Signup
        </h2>

        <input
          name="name"
          placeholder="Name"
          className="border p-2"
          onChange={handleChange}
        />

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

        {/* ROLE SELECT */}
        

        <button className="bg-orange-500 text-white p-2 rounded">
          Signup
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500">
            Login
          </Link>
        </p>

      </form>

    </div>
  )
}

export default Signup