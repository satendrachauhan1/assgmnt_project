import React from "react";

function Header({ cartCount, search, setSearch, setPage }) {
  return (
    <header>
      <div>
        <h1>🌍 Global Laptop Brand Showcase</h1>
        <p>Explore laptop brands used all over the world</p>
      </div>

      <input
        type="text"
        placeholder="Search laptop brand..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <button className="cart-btn" onClick={() => setPage("cart")}>
          🛒 Cart <span>{cartCount}</span>
        </button>

        <button className="cart-btn" onClick={() => setPage("orders")}>
          📦 Orders
        </button>
      </div>
    </header>
  );
}

export default Header;
