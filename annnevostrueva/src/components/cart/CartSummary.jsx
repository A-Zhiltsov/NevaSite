import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import styles from './CartSummary.module.css';

export default function CartSummary({ variant = 'drawer' }) {
  const { totalPrice, totalCount, closeCart } = useCart();

  const isDrawer = variant === 'drawer';

  return (
    <div className={styles.summary}>
      <div className={styles.row}>
        <span>Товары ({totalCount} шт.)</span>
        <span className={styles.total}>{totalPrice.toLocaleString('ru-RU')} ₽</span>
      </div>

      {isDrawer ? (
        <Link to="/checkout" onClick={closeCart} className={styles.linkWrap}>
          <Button>Оформить заказ</Button>
        </Link>
      ) : (
        <Button disabled title="Оплата появится после подключения ЮKassa">
          Оплатить
        </Button>
      )}
    </div>
  );
}