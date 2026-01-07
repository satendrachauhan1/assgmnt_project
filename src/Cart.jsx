function Cart({ cart, products, setPage, updateQty }) {
  const items = Object.entries(cart);

  const getPrice = (name) => {
    const product = products.find((p) => p.name === name);
    return product ? product.price : 0;
  };

  const total = items.reduce(
    (sum, [name, qty]) => sum + getPrice(name) * qty,
    0
  );

  return (
    <div className="box">
      <button onClick={() => setPage("home")}>⬅ Back</button>
      <h2>Your Cart</h2>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map(([name, qty]) => (
        <div key={name} className="cart-row">
          <span>
            {name} – ₹{getPrice(name)}
          </span>

          <div className="qty-box">
            <button onClick={() => updateQty(name, -1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => updateQty(name, 1)}>+</button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h3 className="cart-total">Total: ₹{total}</h3>

          <button
            className="place-order-btn"
            onClick={() => setPage("address")}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
