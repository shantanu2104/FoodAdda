import Order from "../models/Order.js"

export const createOrder = async (req, res) => {

  try {

    const { items, totalAmount } = req.body

    const order = await Order.create({
      userId: req.user._id,
      items,
      totalAmount,
      paymentStatus: "paid"
    })

    res.status(201).json(order)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}



export const getUserOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      userId: req.user._id
    }).populate("items.foodId")

    res.json(orders)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}



export const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("userId", "name email")

    res.json(orders)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}