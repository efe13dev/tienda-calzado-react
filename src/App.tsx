import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import SummerProducts from "./pages/SummerProducts";
import WinterProducts from "./pages/WinterProducts";

function App(): React.JSX.Element {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/ofertas" element={<Offers />} />
          <Route path="/invierno" element={<WinterProducts />} />
          <Route path="/verano" element={<SummerProducts />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
