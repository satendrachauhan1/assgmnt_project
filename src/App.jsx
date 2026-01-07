import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import Address from "./Address";
import Payment from "./Payment";
import Orders from "./Orders";
import products from "./data";

function App() {
  /* ================= STATE ================= */
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("laptopCart")) || {};
  });

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("laptopOrders")) || [];
  });

  const [pendingOrder, setPendingOrder] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState("home");

  /* ================= LOCAL STORAGE ================= */
  useEffect(() => {
    localStorage.setItem("laptopCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("laptopOrders", JSON.stringify(orders));
  }, [orders]);

  /* ================= CART FUNCTIONS ================= */
  const addToCart = (name) => {
    setCart({ ...cart, [name]: (cart[name] || 0) + 1 });
  };

  const removeFromCart = (name) => {
    const updated = { ...cart };
    updated[name]--;
    if (updated[name] <= 0) delete updated[name];
    setCart(updated);
  };

  const updateQty = (name, change) => {
    setCart((prev) => {
      const updated = { ...prev };
      updated[name] = (updated[name] || 0) + change;
      if (updated[name] <= 0) delete updated[name];
      return updated;
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  /* ================= SEARCH ================= */
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= ORDER FLOW ================= */

  // Final order placement after payment
  const placeFinalOrder = () => {
    if (!pendingOrder) return;

    const newOrder = {
      id: "ORD" + Date.now(),
      ...pendingOrder,
    };

    setOrders([...orders, newOrder]);
    setCart({});
    setPendingOrder(null);
    setPage("orders");

    alert("Order placed successfully! (Payment simulated)");
  };

  // Update address & phone in Orders page
  const updateAddress = (orderId, address, phone) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, address, phone }
          : order
      )
    );
  };

  // Delete entire order
  const deleteOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  /* ================= UI ================= */
  return (
    <>
      <Header
        cartCount={cartCount}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
      />

      {/* HOME */}
      {page === "home" && (
        <>
          <div className="brand-container">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                quantity={cart[product.name] || 0}
                onAdd={addToCart}
                onRemove={removeFromCart}
              />
            ))}
          </div>
          <Footer />
        </>
      )}

      {/* CART */}
      {page === "cart" && (
        <Cart
          cart={cart}
          products={products}
          setPage={setPage}
          updateQty={updateQty}
        />
      )}

      {/* ADDRESS */}
      {page === "address" && (
        <Address
          cart={cart}
          products={products}
          setPage={setPage}
          setPendingOrder={setPendingOrder}
        />
      )}

      {/* PAYMENT */}
      {page === "payment" && (
        <Payment
          pendingOrder={pendingOrder}
          placeFinalOrder={placeFinalOrder}
          setPage={setPage}
        />
      )}

      {/* ORDERS */}
      {page === "orders" && (
        <Orders
          orders={orders}
          setPage={setPage}
          updateAddress={updateAddress}
          deleteOrder={deleteOrder}
        />
      )}
    </>
  );
}

export default App;
