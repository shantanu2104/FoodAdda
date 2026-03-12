import { useEffect } from "react"
import { useCart } from "../context/CartContext"
import API from "../api/axios"

function Success() {

  const { cartItems } = useCart()

  useEffect(() => {

    const saveOrder = async () => {

      const token = localStorage.getItem("token")

      const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )

      await API.post(
        "/order",
        { items: cartItems, totalAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

    }

    saveOrder()

  }, [])

  return (
    <div className="flex flex-col items-center mt-20">

      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="mt-4">
        Your order has been placed successfully.
      </p>

    </div>
  )
}

export default Success