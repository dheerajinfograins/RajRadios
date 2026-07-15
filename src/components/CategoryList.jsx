export default function CategoryList() {
  const categories = [
    "Speakers",
    "Amplifiers",
    "Home Theater",
    "Bluetooth Radios",
    "Wired Radios",
    "Accessories",
  ];

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat}
            className="p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition"
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
