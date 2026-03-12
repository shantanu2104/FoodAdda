import { useEffect, useState } from "react"
import API from "../api/axios"
import FoodCard from "../components/FoodCard"

function Home() {

  const [foods, setFoods] = useState([])
  const [message, setMessage] = useState("")

  const fetchFoods = async () => {
    try {
      const { data } = await API.get("/food")
      setFoods(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("")
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Explore Food
      </h1>

      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 w-fit">
          {message}
        </div>
      )}

      <div className="grid grid-cols-4 gap-6">
        {foods.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            showMessage={setMessage}
          />
        ))}
      </div>

    </div>
  )
}

export default Home