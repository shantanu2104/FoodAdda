import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

function AddFood() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: ""
  })

  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    const data = new FormData()

    data.append("name", form.name)
    data.append("price", form.price)
    data.append("category", form.category)
    data.append("description", form.description)
    data.append("image", image)

    await API.post("/food", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    alert("Food added successfully")

    navigate("/admin")   // redirect to admin dashboard
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96 bg-white p-6 rounded shadow"
      >

        <h1 className="text-2xl font-bold text-center">
          Add Food
        </h1>

        <input
          name="name"
          placeholder="Food name"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
          Add Food
        </button>

      </form>

    </div>
  )
}

export default AddFood