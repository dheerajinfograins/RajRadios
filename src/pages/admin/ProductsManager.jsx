import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, updateProduct, deleteProduct, resetProductStatus } from "../../feactures/product/productSlice";
import { SERVER_URL } from "../../utils/axiosInstance";
import { Plus, Trash2, Edit, Loader2, Image as ImageIcon, Search } from "lucide-react";

const ProductsManager = () => {
  const dispatch = useDispatch();
  const { products, loading, error, success } = useSelector((state) => state.product);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    mrp: "",
    category: "",
    brand: "",
    stock: "",
    status: "active",
    isFeatured: false,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      closeModal();
      dispatch(resetProductStatus());
    }
  }, [success, dispatch]);

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      name: "", description: "", price: "", mrp: "", 
      category: "", brand: "", stock: "", status: "active", isFeatured: false
    });
    setSelectedFiles([]);
    setPreviewImages([]);
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      mrp: product.mrp || "",
      category: product.category || "",
      brand: product.brand || "",
      stock: product.stock || "",
      status: product.status || "active",
      isFeatured: product.isFeatured || false,
    });
    
    // Existing images preview
    if (product.images) {
      setPreviewImages(product.images.map(img => `${SERVER_URL}${img}`));
    } else {
      setPreviewImages([]);
    }
    
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);

    // Preview images
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previews]);
    
    // Clear input so same file can be selected again if needed
    e.target.value = null;
  };

  const removeImage = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setPreviewImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    selectedFiles.forEach(file => {
      data.append("images", file);
    });

    if (editingId) {
      // Send the remaining existing images
      const existingPaths = previewImages
        .filter(url => url.startsWith("http"))
        .map(url => url.replace(SERVER_URL, ""));
      data.append("existingImages", JSON.stringify(existingPaths));

      dispatch(updateProduct({ id: editingId, productData: data }));
    } else {
      dispatch(createProduct(data));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase();
    return (
      product._id?.toLowerCase().includes(query) ||
      product.name?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );
  });

  let tableContent;
  if (products.length === 0) {
    tableContent = (
      <tr>
        <td colSpan="6" className="p-8 text-center text-gray-500">
          No products found. Add your first product!
        </td>
      </tr>
    );
  } else if (filteredProducts.length === 0) {
    tableContent = (
      <tr>
        <td colSpan="6" className="p-8 text-center text-gray-500">
          No products matched your search.
        </td>
      </tr>
    );
  } else {
    tableContent = filteredProducts.map(product => (
      <tr key={product._id} className="hover:bg-gray-50">
        <td className="p-4 flex items-center gap-3">
          <div className="h-12 w-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
            {product.images && product.images.length > 0 ? (
              <img src={`${SERVER_URL}${product.images[0]}`} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <ImageIcon className="text-gray-400" />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{product.name}</p>
            <p className="text-xs text-gray-500">{product.brand}</p>
          </div>
        </td>
        <td className="p-4">₹{product.price}</td>
        <td className="p-4">
          <span className={`px-2 py-1 rounded text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </td>
        <td className="p-4">{product.category}</td>
        <td className="p-4">
          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${product.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
            {product.status}
          </span>
        </td>
        <td className="p-4 text-right space-x-2">
          <button 
            onClick={() => handleEditClick(product)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => handleDelete(product._id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </td>
      </tr>
    ));
  }

  const buttonActionText = editingId ? 'Update Product' : 'Save Product';

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-3">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search ID, Name or Category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button 
            onClick={() => {
              setEditingId(null);
              setShowModal(true);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 w-full sm:w-auto justify-center transition-colors shadow-sm text-sm"
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>}

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && !showModal ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-orange-500" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">Product</th>
                  <th className="p-4 font-semibold text-gray-600">Price</th>
                  <th className="p-4 font-semibold text-gray-600">Stock</th>
                  <th className="p-4 font-semibold text-gray-600">Category</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableContent}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl my-8">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-xl z-10">
              <h3 className="text-xl font-bold text-gray-800">{editingId ? "Edit Product" : "Add New Product"}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input id="productName" required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                  <label htmlFor="productBrand" className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                  <input id="productBrand" required type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                
                <div>
                  <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹) *</label>
                  <input id="productPrice" required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                  <label htmlFor="productMrp" className="block text-sm font-medium text-gray-700 mb-1">MRP (₹)</label>
                  <input id="productMrp" type="number" name="mrp" value={formData.mrp} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>

                <div>
                  <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select id="productCategory" required name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none">
                    <option value="">Select Category...</option>
                    <option value="Radios">Radios</option>
                    <option value="Speakers">Speakers</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Spare Parts">Spare Parts</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="productStock" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                  <input id="productStock" required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
              </div>

              <div>
                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea id="productDescription" required name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
              </div>

              <div>
                <label htmlFor="productImages" className="block text-sm font-medium text-gray-700 mb-1">Product Images (Select multiple)</label>
                <input 
                  id="productImages"
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={handleFileChange} 
                  className="w-full border border-gray-300 rounded-lg p-2.5 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
                />
                
                {previewImages.length > 0 && (
                  <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                    {previewImages.map((src, idx) => (
                      <div key={src} className="relative group">
                        <img src={src} alt="preview" className="h-20 w-20 object-cover rounded-lg border border-gray-200" />
                        <button 
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Feature on Homepage</span>
                </label>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="productStatus" className="text-sm font-medium text-gray-700">Status:</label>
                  <select id="productStatus" name="status" value={formData.status} onChange={handleInputChange} className="border border-gray-300 rounded p-1 text-sm outline-none">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={closeModal} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium flex items-center gap-2 disabled:opacity-70">
                  {loading && <Loader2 className="animate-spin" size={18} />}
                  {loading ? 'Saving...' : buttonActionText}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductsManager;
