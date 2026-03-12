import { Link } from "react-router-dom"

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <Link
          to="/admin/add-food"
          className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-10 rounded-xl shadow-lg text-center text-xl font-semibold transition transform hover:scale-105"
        >
          🍔 Add Food
          <p className="text-sm font-normal mt-2 opacity-90">
            Add new food items to the menu
          </p>
        </Link>

        <Link
          to="/admin/manage-food"
          className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-10 rounded-xl shadow-lg text-center text-xl font-semibold transition transform hover:scale-105"
        >
          📋 Manage Food
          <p className="text-sm font-normal mt-2 opacity-90">
            Edit or delete existing food items
          </p>
        </Link>

      </div>

    </div>
  )
}

export default AdminDashboard