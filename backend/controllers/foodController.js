import Food from "../models/Food.js"
import cloudinary from "../config/cloudinary.js"

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find()
    res.json(foods)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addFood = async (req, res) => {
  try {
    const { name, price, category, description } = req.body

    let imageUrl = ""

    if (req.file) {
      const uploadImage = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "foodadda" },
            (error, result) => {
              if (error) return reject(error)
              resolve(result)
            }
          )

          stream.end(req.file.buffer)
        })
      }

      const result = await uploadImage()
      imageUrl = result.secure_url
    }

    const food = await Food.create({
      name,
      price: Number(price),
      category,
      description,
      image: imageUrl
    })

    res.status(201).json(food)

  } catch (error) {
    console.log("ADD FOOD ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}
export const deleteFood = async (req, res) => {
  try {

    const food = await Food.findById(req.params.id)

    if (!food) {
      return res.status(404).json({ message: "Food not found" })
    }

    await food.deleteOne()

    res.json({ message: "Food deleted" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}