import apple from "./assets/images/apple.jpg";
import dell from "./assets/images/dell.jpg";
import hp from "./assets/images/hp.jpg";
import lenovo from "./assets/images/lenovo.jpg";
import asus from "./assets/images/asus.jpg";
import acer from "./assets/images/acer.jpg";
import msi from "./assets/images/msi.jpg";
import samsung from "./assets/images/samsung.jpg";
import microsoft from "./assets/images/microsoft.jpg";
import lg from "./assets/images/lg.jpg";
import razer from "./assets/images/razer.jpg";
import defaultImg from "./assets/images/default.jpg";

const imageMap = {
  "apple.jpg": apple,
  "dell.jpg": dell,
  "hp.jpg": hp,
  "lenovo.jpg": lenovo,
  "asus.jpg": asus,
  "acer.jpg": acer,
  "msi.jpg": msi,
  "samsung.jpg": samsung,
  "microsoft.jpg": microsoft,
  "lg.jpg": lg,
  "razer.jpg": razer
};

function ProductCard({ product, quantity, onAdd, onRemove }) {
  const imgSrc = imageMap[product.image] || defaultImg;

  return (
    <div className="brand-card">
      <img
        src={imgSrc}
        alt={product.name}
        className="product-image"
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
