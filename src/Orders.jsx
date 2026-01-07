import { useState } from "react";

function Orders({ orders, setPage, updateAddress, deleteOrder }) {
  const [editId, setEditId] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="box">
      <button onClick={() => setPage("home")}>⬅ Back</button>
      <h2>Your Orders</h2>

      {orders.map((o) => (
        <div key={o.id} className="order-card">
          <p><b>Order ID:</b> {o.id}</p>
          <p><b>Date:</b> {o.date}</p>

          {Object.entries(o.items).map(([n, q]) => (
            <p key={n}>{n} × {q}</p>
          ))}

          {editId === o.id ? (
            <>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
              <button onClick={() => {
                updateAddress(o.id, address, phone);
                setEditId(null);
              }}>Save</button>
            </>
          ) : (
            <>
              <p><b>Address:</b> {o.address}</p>
              <p><b>Phone:</b> {o.phone}</p>

              <button onClick={() => {
                setEditId(o.id);
                setAddress(o.address);
                setPhone(o.phone);
              }}>✏️ Update Address</button>

              <button onClick={() => deleteOrder(o.id)}>
                🗑 Delete Order
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;
