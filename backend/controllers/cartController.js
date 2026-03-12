import Cart from "../models/Cart.js"

export const getCart = async (req, res) => {
  try {

    let cart = await Cart.findOne({ user: req.user.id })
      .populate("items.food")

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] })
    }

    res.json(cart)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const addToCart = async (req, res) => {
  try {

    const { foodId } = req.body

    let cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] })
    }

    const item = cart.items.find(
      i => i.food.toString() === foodId
    )

    if (item) {
      item.quantity += 1
    } else {
      cart.items.push({ food: foodId, quantity: 1 })
    }

    await cart.save()

    res.json(cart)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const updateCartQty = async (req, res) => {
  try {

    const { foodId, type } = req.body

    const cart = await Cart.findOne({ user: req.user.id })

    const item = cart.items.find(
      i => i.food.toString() === foodId
    )

    if (!item) return res.status(404).json({ message: "Item not found" })

    if (type === "inc") item.quantity++
    if (type === "dec") item.quantity--

    cart.items = cart.items.filter(i => i.quantity > 0)

    await cart.save()

    res.json(cart)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const removeFromCart = async (req, res) => {
  try {

    const { foodId } = req.body

    const cart = await Cart.findOne({ user: req.user.id })

    cart.items = cart.items.filter(
      i => i.food.toString() !== foodId
    )

    await cart.save()

    res.json(cart)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}