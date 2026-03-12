import { createContext, useContext, useState, useEffect } from "react"
import API from "../api/axios"

const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([])

  const token = localStorage.getItem("token")

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchCart = async () => {
    const { data } = await API.get("/cart", config)

    const formatted = data.items.map(item => ({
      ...item.food,
      quantity: item.quantity
    }))

    setCartItems(formatted)
  }

  useEffect(() => {
    if (token) fetchCart()
  }, [token])


  const addToCart = async (foodId) => {
    await API.post("/cart/add", { foodId }, config)
    fetchCart()
  }

  const increaseQty = async (foodId) => {
    await API.post("/cart/update", { foodId, type: "inc" }, config)
    fetchCart()
  }

  const decreaseQty = async (foodId) => {
    await API.post("/cart/update", { foodId, type: "dec" }, config)
    fetchCart()
  }

  const removeFromCart = async (foodId) => {
    await API.post("/cart/remove", { foodId }, config)
    fetchCart()
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)