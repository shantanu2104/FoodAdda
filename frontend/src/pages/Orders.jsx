import { useEffect, useState } from "react"
import API from "../api/axios"

function Orders() {

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {

    const token = localStorage.getItem("token")

    const { data } = await API.get(
      "/order/my-orders",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    setOrders(data)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 mb-4"
        >

          <p>Total: ₹{order.totalAmount}</p>

          <p>Status: {order.status}</p>

        </div>
      ))}

    </div>
  )
}

export default Orders