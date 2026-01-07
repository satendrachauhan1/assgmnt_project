import React from "react";

function ProductCard({ product, quantity, onAdd, onRemove }) {
  return (
    <div className="brand-card">
     <img
  src={`/images/${product.image}`}
  alt={product.name}
  className="product-img"
/>


      <h3>{product.name}</h3>
      <p>{product.range}</p>

      <div className="card-footer">
        <button onClick={() => onAdd(product.name)}>+</button>

        {quantity > 0 && (
          <>
            <button onClick={() => onRemove(product.name)}>-</button>
            <span className="item-count">{quantity}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
