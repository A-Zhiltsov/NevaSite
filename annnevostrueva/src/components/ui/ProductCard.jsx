import Button from './Button'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>{product.price.toLocaleString('ru-RU')} ₽</p>
        <Button>В корзину</Button>
      </div>
    </article>
  )
}