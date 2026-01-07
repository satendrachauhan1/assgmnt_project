import { useState, useMemo } from "react";

function Address({ cart, setPage, setPendingOrder, products }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Order summary calculation
  const summary = useMemo(() => {
    let total = 0;
    const items = Object.entries(cart).map(([name, qty]) => {
      const product = products.find((p) => p.name === name);
      const price = product ? product.price : 0;
      total += price * qty;
      return { name, qty, price };
    });
    return { items, total };
  }, [cart, products]);

  const isValid =
    name.trim() &&
    address.trim() &&
    /^[0-9]{10}$/.test(phone);

  const continueToPayment = () => {
    if (!isValid) {
      setError("Please fill all details correctly");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setPendingOrder({
        name,
        phone,
        address,
        items: cart,
        total: summary.total,
        date: new Date().toLocaleString(),
      });
      setLoading(false);
      setPage("payment");
    }, 600); // animation delay
  };

  return (
    <div className="address-wrapper">
      <div className="address-card">
        <h2>Delivery Address</h2>

        {/* 🔹 ORDER SUMMARY */}
        <div className="order-summary">
          <h4>Order Summary</h4>
          {summary.items.map((item) => (
            <p key={item.name}>
              {item.name} × {item.qty} — ₹{item.price * item.qty}
            </p>
          ))}
          <strong>Total: ₹{summary.total}</strong>
        </div>

        {/* 🔹 FORM */}
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit phone number"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House no, street, city"
            rows="3"
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        {/* 🔹 BUTTON */}
        <button
          className={`confirm-btn ${loading ? "loading" : ""}`}
          disabled={!isValid || loading}
          onClick={continueToPayment}
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>

        <button className="cancel-btn" onClick={() => setPage("cart")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Address;
