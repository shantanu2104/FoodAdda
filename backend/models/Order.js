import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food"
        },

        quantity: Number
      }
    ],

    totalAmount: Number,

    paymentStatus: {
      type: String,
      default: "pending"
    },

    status: {
      type: String,
      default: "processing"
    }
  },
  { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

export default Order