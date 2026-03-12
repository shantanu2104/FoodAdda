import { useCart } from "../context/CartContext"

function FoodCard({ food, showMessage }) {

  const { addToCart } = useCart()

  const handleAdd = async () => {

    try {

      await addToCart(food._id)

      if (showMessage) {
        showMessage("Item added to cart")
      }

    } catch (error) {
      console.log(error)
      alert("Failed to add item")
    }
  }

  return (
    <div className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1">

      {/* Food Image */}
      {food.image && (
  <img
    src={food.image}
    alt={food.name}
    className="h-40 w-full object-cover"
  />
)}

      <div className="p-4 flex flex-col gap-2">

        {/* Food Name */}
        <h2 className="text-lg font-semibold">
          {food.name}
        </h2>

        {/* Category */}
        <p className="text-gray-500 text-sm">
          {food.category}
        </p>

        {/* Price */}
        <p className="text-orange-600 font-bold text-lg">
          ₹{food.price}
        </p>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition"
        >
          Add to Cart
        </button>

      </div>

    </div>
  )
}

export default FoodCard