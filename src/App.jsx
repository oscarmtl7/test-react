import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/NavbarComponent";
import ProductList from "./pages/ProductList";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const handleDrop = (productStr) => {
    const product = JSON.parse(productStr);
    console.log(productStr);
    if (!cart.find((item) => item.id === product.id)) {
      setCart((prev) => [...prev, product]);
    }
  };

  const handleReset = () => {
    setSearch("");
    setCart([]);
  };

  return (
    <div className="App">
      <Navbar onSearch={setSearch} onReset={handleReset} />
      <main style={{ padding: "2rem" }}>
        <ShoppingCart items={cart} onDrop={handleDrop} />
        <ProductList searchQuery={search} cartItems={cart} />
      </main>
    </div>
  );
}

export default App;
