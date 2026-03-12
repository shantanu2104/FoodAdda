import dotenv from "dotenv"
dotenv.config()
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export const createCheckoutSession = async (req, res) => {

  try {

    const { cartItems } = req.body

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",

      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart"
    })

    res.json({ url: session.url })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}