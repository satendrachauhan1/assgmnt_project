import { useState } from "react";

function Payment({ pendingOrder, placeFinalOrder, setPage }) {
  const [method, setMethod] = useState("COD");

  if (!pendingOrder) return null;

  return (
    <div className="box">
      <h2>Payment</h2>

      <p><b>Name:</b> {pendingOrder.name}</p>
      <p><b>Phone:</b> {pendingOrder.phone}</p>
      <p><b>Address:</b> {pendingOrder.address}</p>

      <h3>Select Payment Method</h3>

      <label>
        <input
          type="radio"
          name="pay"
          value="COD"
          checked={method === "COD"}
          onChange={(e) => setMethod(e.target.value)}
        />
        Cash on Delivery
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="pay"
          value="UPI"
          checked={method === "UPI"}
          onChange={(e) => setMethod(e.target.value)}
        />
        UPI
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="pay"
          value="CARD"
          checked={method === "CARD"}
          onChange={(e) => setMethod(e.target.value)}
        />
        Debit / Credit Card
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="pay"
          value="RAZORPAY"
          checked={method === "RAZORPAY"}
          onChange={(e) => setMethod(e.target.value)}
        />
        Razorpay (Demo)
      </label>

      <br /><br />

      <button
        onClick={() => {
          alert(`Payment Method Selected: ${method}\n(This is demo only)`);
          placeFinalOrder();
        }}
      >
        Pay & Place Order
      </button>

      <button onClick={() => setPage("address")}>
        Back
      </button>
    </div>
  );
}

export default Payment;
