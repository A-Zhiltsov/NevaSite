import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import styles from './CartItem.module.css';

export default function CartItem({ item, variant = 'compact' }) {
  const { increase, decrease, removeItem } = useCart();
  const product = products.find(p => p.id === item.id);

  if (!product) return null;

  return (
    <div className={`${styles.item} ${styles[variant]}`}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.image}
      />

      <div className={styles.info}>
        <h4 className={styles.title}>{product.title}</h4>
        <p className={styles.price}>
          {product.price.toLocaleString('ru-RU')} Р.
        </p>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => decrease(item.id)}
          className={styles.qtyBtn}
          aria-label="Уменьшить количество"
        >
          −
        </button>
        <span className={styles.qty}>{item.quantity}</span>
        <button
          type="button"
          onClick={() => increase(item.id)}
          className={styles.qtyBtn}
          aria-label="Увеличить количество"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className={styles.remove}
        aria-label="Удалить товар"
      >
        ×
      </button>
    </div>
  );
}