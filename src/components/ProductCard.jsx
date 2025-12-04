export default function ProductCard({ title, price, image }) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer w-64">
      
      <div className="w-full h-40 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full"
        />
      </div>

      <h2 className="text-lg font-semibold mt-3">{title}</h2>

      <p className="text-yellow-400 font-bold mt-1">₹{price}</p>

      <button className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition">
        Add to Cart
      </button>

    </div>
  );
}
