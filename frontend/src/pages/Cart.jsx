import { useCart } from "../context/CartContext"
import API from "../api/axios"
import { useState, useEffect } from "react"

function Cart() {

  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart()

  const [message, setMessage] = useState("")

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("")
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [message])

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const checkoutHandler = async () => {

    const token = localStorage.getItem("token")

    const { data } = await API.post(
      "/payment/checkout",
      { cartItems },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    window.location.href = data.url
  }

  const handleIncrease = (id) => {
    increaseQty(id)
    setMessage("Item added to cart")
  }

  const handleDecrease = (id) => {
    decreaseQty(id)
    setMessage("Item quantity decreased")
  }

  const handleRemove = (id) => {
    removeFromCart(id)
    setMessage("Item removed from cart")
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 w-fit">
          {message}
        </div>
      )}



    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

  {cartItems.map((item) => (

    <div
      key={item._id}
      className="bg-orange-50 border rounded-lg shadow overflow-hidden flex flex-col items-center text-center hover:shadow-lg transition"
    >

      {/* Food Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-28 object-cover"
      />

      <div className="p-3 flex flex-col items-center gap-2">

        <h2 className="text-lg font-semibold">
          {item.name}
        </h2>

        <p className="text-gray-700 text-sm">
          ₹{item.price}
        </p>

        <div className="flex items-center gap-2">

          <button
            onClick={() => handleDecrease(item._id)}
            className="bg-white px-2 py-1 rounded border text-sm"
          >
            -
          </button>

          <span className="font-semibold text-sm">
            {item.quantity}
          </span>

          <button
            onClick={() => handleIncrease(item._id)}
            className="bg-white px-2 py-1 rounded border text-sm"
          >
            +
          </button>

        </div>

        <button
          onClick={() => handleRemove(item._id)}
          className="text-red-500 text-sm mt-1"
        >
          Remove
        </button>

      </div>

    </div>

  ))}

</div>


      <div className="mt-8">

        <h2 className="text-2xl font-bold">
          Total: ₹{totalPrice}
        </h2>

        <button
          onClick={checkoutHandler}
          className="bg-green-600 text-white px-6 py-3 mt-4 rounded hover:bg-green-700"
        >
          Checkout
        </button>

      </div>

    </div>
  )
}

export default Cart
