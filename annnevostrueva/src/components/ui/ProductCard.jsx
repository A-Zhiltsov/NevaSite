import { useState } from 'react';
import Button from './Button';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const [imgFailed, setImgFailed] = useState(false);
  const { addItem } = useCart();

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {imgFailed || !product.image ? (
          <span className={styles.imageFallback}>Нет фото</span>
        ) : (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>{product.price.toLocaleString('ru-RU')} Р.</p>
        <Button onClick={() => addItem(product)}>В корзину</Button>
      </div>
    </article>
  );
}