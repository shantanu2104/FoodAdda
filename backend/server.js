
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"

import connectDB from "./config/db.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import foodRoutes from "./routes/foodRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/food", foodRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/order", orderRoutes)

app.get("/", (req, res) => {
  res.send("FoodAdda API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})