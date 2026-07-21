import { useState, useEffect } from "react";
import { ShoppingCart, Heart, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../feactures/cart/cartSlice";
import { toggleWishlist } from "../../feactures/wishlist/wishlistSlice";
import { fetchProducts } from "../../feactures/product/productSlice";
import { SERVER_URL } from "../../utils/axiosInstance";

export default function Shop() {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { products, loading } = useSelector((state) => state.product);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const handleAddToCart = (e, product) => {
    if (e) e.stopPropagation();
    // Ensure product has id field for cart slice compatibility
    const cartProduct = { ...product, id: product._id, image: product.images?.[0] ? `${SERVER_URL}${product.images[0]}` : "" };
    dispatch(addToCart(cartProduct));
  };

  const handleWishlist = (e, product) => {
    if (e) e.stopPropagation();
    const wishProduct = { ...product, id: product._id, image: product.images?.[0] ? `${SERVER_URL}${product.images[0]}` : "" };
    dispatch(toggleWishlist(wishProduct));
  };

  const isWishlisted = (id) => wishlistItems.some((item) => item.id === id);

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const nextImage = () => {
    if (selectedProduct?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  let renderedProducts;

  if (loading) {
    renderedProducts = (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  } else if (products.length === 0) {
    renderedProducts = (
      <div className="text-center text-gray-400 mt-20 text-xl">
        No products available at the moment.
      </div>
    );
  } else {
    renderedProducts = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <button
            key={product._id}
            onClick={() => openModal(product)}
            className="text-left w-full group cursor-pointer bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden bg-gray-900">
              <img
                src={product.images && product.images.length > 0 ? `${SERVER_URL}${product.images[0]}` : ""}
                alt={product.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              {/* Wishlist Button */}
              <button 
                onClick={(e) => handleWishlist(e, product)}
                className="absolute top-4 right-4 p-2.5 bg-gray-900/60 backdrop-blur-md rounded-full text-gray-300 hover:text-red-500 hover:bg-gray-900 border border-transparent hover:border-red-500/50 transition-all duration-300 z-10 shadow-lg"
              >
                <Heart className={`w-5 h-5 transition-colors ${isWishlisted(product._id) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              {/* Stock Badge */}
              {product.stock <= 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-cyan-400 transition-colors">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">{product.description}</p>
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700/50">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-extrabold text-2xl">
                  ₹{product.price}
                </p>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={product.stock <= 0}
                  className="p-3 bg-gray-900/80 border border-gray-700/50 rounded-full text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 shadow-lg transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#0a0f16] text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative pt-36 pb-16 px-6 md:px-12 lg:px-20">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>

      {/* Page Header */}
      <section className="relative z-10 text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Products</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore our premium collection of vintage radios and cutting-edge audio equipment, crafted for true audiophiles.
        </p>
      </section>

      {/* Product Grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto min-h-[50vh]">
        {renderedProducts}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row relative shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 bg-gray-800/80 text-gray-300 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Image Gallery */}
            <div className="md:w-1/2 relative bg-black aspect-square md:aspect-auto flex items-center justify-center">
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <>
                  <img 
                    src={`${SERVER_URL}${selectedProduct.images[currentImageIndex]}`} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-contain"
                  />
                  
                  {selectedProduct.images.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-4 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors">
                        <ChevronLeft size={24} />
                      </button>
                      <button onClick={nextImage} className="absolute right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors">
                        <ChevronRight size={24} />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {selectedProduct.images.map((imgUrl, idx) => (
                          <div 
                            key={imgUrl} 
                            className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-cyan-500' : 'bg-gray-500'}`}
                          ></div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-gray-500">No Image Available</div>
              )}
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8 flex flex-col">
              <div className="flex-grow">
                <div className="text-cyan-500 text-sm font-bold uppercase tracking-wider mb-2">{selectedProduct.category}</div>
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProduct.name}</h2>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    ₹{selectedProduct.price}
                  </span>
                  {selectedProduct.mrp && selectedProduct.mrp > selectedProduct.price && (
                    <span className="text-lg text-gray-500 line-through">₹{selectedProduct.mrp}</span>
                  )}
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Description</h3>
                  <p className="text-gray-400 leading-relaxed max-h-48 overflow-y-auto pr-2 custom-scrollbar whitespace-pre-line">
                    {selectedProduct.description ? selectedProduct.description.replace(/(Key Features)/gi, '\n\n$1:\n') : ''}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Brand</span>
                    <span className="text-white font-medium">{selectedProduct.brand}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Availability</span>
                    <span className={`font-medium ${selectedProduct.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <button 
                  onClick={() => handleAddToCart(null, selectedProduct)}
                  disabled={selectedProduct.stock <= 0}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  {selectedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button 
                  onClick={() => handleWishlist(null, selectedProduct)}
                  className={`p-4 border rounded-xl flex items-center justify-center transition-all ${
                    isWishlisted(selectedProduct._id) 
                      ? 'border-red-500 bg-red-500/10 text-red-500' 
                      : 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Heart className={isWishlisted(selectedProduct._id) ? 'fill-red-500' : ''} size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
