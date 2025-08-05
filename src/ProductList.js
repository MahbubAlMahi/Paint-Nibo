import React, { useEffect, useState } from "react";
import axios from "axios";
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch products based on selected category
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products?category=${selectedCategory === "All" ? "" : selectedCategory}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Re-fetch products when category changes

  const addToCart = (productId) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("❌ Please log in first!");
      return;
    }

    const cartData = { productId, quantity: 1, email };
    console.log("Sending data to backend:", cartData);  // Log cart data

    axios
      .post("http://localhost:8080/api/cart/add", cartData)
      .then((response) => {
        console.log("Response from backend:", response);  // Log response
        alert("✅ Product added to cart!");
      })
      .catch((error) => {
        console.error("❌ Error adding to cart:", error.response ? error.response.data : error.message);
        alert("❌ Error adding product to cart. Please check your console for more details.");
      });
  };

  const categories = ["All", "Home Decor", "Showpieces", "Furniture", "Paints"];

  // Filter products by search term (case insensitive)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCardBgColor = (category) => {
    switch (category?.toLowerCase()) {
      case "home decor":
        return "#fff5e6";
      case "showpieces":
        return "#e6f7ff";
      case "furniture":
        return "#e6ffe6";
      case "paints":
        return "#fff0f5";
      default:
        return "#ffffff";
    }
  };

  // Function to get the image path for each product
  const getImagePath = (product) => {
    // If the product has an image, use it; otherwise, fall back to category-specific images
    if (product.image) {
      return product.image; // Use product's image if it exists
    } else {
      // Fallback to predefined images based on the product name
      return getFallbackImage(product.name);
    }
  };

  // Fallback image logic based on the product name
  const getFallbackImage = (productName) => {
    const productImages = {
      "Interior Wall Paint": "/images/paint1.jpg",
      "Exterior Weather Coat": "/images/paint2.jpg",
      "Glossy Spray Paint": "/images/paint3.jpg",
      "Brush Set Pro": "/images/paint4.jpg",
      "Elegant Wall Clock": "/images/paint5.jpg",
      "Modern Floor Lamp": "/images/paint6.jpg",
      "Decorative Vase Set": "/images/paint7.jpg",
      "Wall Art Canvas": "/images/paint8.jpg",
      "Miniature Eiffel Tower": "/images/paint9.jpg",
      "Crystal Ball Globe": "/images/paint10.jpg",
      "Elephant Statue": "/images/paint11.jpg",
      "Buddha Sculpture": "/images/paint12.jpg",
      "Wooden Side Table": "/images/paint13.jpg",
      "Modern Bookshelf": "/images/paint14.jpg",
      "Foldable Chair": "/images/paint15.jpg",
      "Storage Ottoman": "/images/paint16.jpg"
    };

    // Return the correct fallback image based on the product name
    return productImages[productName] || "/images/default_fallback.jpg";
  };

  return (
    <div className="product-list" style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <h2>🛒 Paint Nibo Product List</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div style={{ marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              backgroundColor: selectedCategory === cat ? "#4CAF50" : "#aaa",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-cards">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              style={{ backgroundColor: getCardBgColor(product.category) }}
            >
              <img
                src={getImagePath(product)} // Use the image path from the function
                alt={product.name}
                className="product-image"
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
              />
              <div className="product-info">
                <strong className="product-name">{product.name}</strong>
                <p>{product.description}</p>
                <p className="product-price">💰 {product.price} BDT</p>
                <button className="btn-add-to-cart" onClick={() => addToCart(product.id)}>
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
