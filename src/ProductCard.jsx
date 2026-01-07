function ProductCard({ product, quantity, onAdd, onRemove }) {
  const imageUrl = new URL(
    `../assets/images/${product.image}`,
    import.meta.url
  ).href;

  const fallbackUrl = new URL(
    `../assets/images/default.jpg`,
    import.meta.url
  ).href;

  return (
    <div className="brand-card">
      <img
        src={imageUrl}
        alt={product.name}
        onError={(e) => {
          e.target.src = fallbackUrl;
        }}
      />

      <h3>{product.name}</h3>
      <p>{product.range}</p>
      <h4>₹{product.price}</h4>

      <div className="qty-box">
        <button
          onClick={() => onRemove(product.name)}
          disabled={quantity === 0}
        >
          -
        </button>

        <span>{quantity}</span>

        <button onClick={() => onAdd(product.name)}>+</button>
      </div>
    </div>
  );
}

export default ProductCard;
