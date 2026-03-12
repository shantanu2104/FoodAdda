import { useEffect, useState } from "react"
import API from "../api/axios"

function ManageFood() {

  const [foods, setFoods] = useState([])

  const fetchFoods = async () => {
    const { data } = await API.get("/food")
    setFoods(data)
  }

  const deleteFood = async (id) => {

    const token = localStorage.getItem("token")

    await API.delete(`/food/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    fetchFoods()
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Manage Food
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {foods.map((food) => (

          <div
            key={food._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >

            {/* Food Image */}
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-5 flex flex-col items-center text-center gap-2">

              <h2 className="text-xl font-semibold">
                {food.name}
              </h2>

              <p className="text-gray-500">
                {food.category}
              </p>

              <p className="text-orange-600 font-bold text-lg">
                ₹{food.price}
              </p>

              <button
                onClick={() => deleteFood(food._id)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Delete Food
              </button>

            </div>

          </div>

        ))}

      </div>

      {foods.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No food items available
        </p>
      )}

    </div>
  )
}

export default ManageFood