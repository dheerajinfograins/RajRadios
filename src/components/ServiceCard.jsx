export default function ServiceCard({ title, description, price, icon }) {
  return (
    <div className="bg-gray-900 text-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer w-72">
      
      {/* Icon Section */}
      <div className="text-yellow-400 text-4xl mb-3 flex items-center justify-center">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2 text-center">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-300 text-sm text-center">
        {description}
      </p>

      {/* Price */}
      <p className="mt-3 text-yellow-400 font-bold text-center">
        Starting at ₹{price}
      </p>

      {/* Button */}
      <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition">
        Book Service
      </button>
    </div>
  );
}
