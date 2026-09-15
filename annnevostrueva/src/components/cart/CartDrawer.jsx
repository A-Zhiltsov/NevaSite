import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { items, isOpen, closeCart } = useCart();

  // Escape закрывает панель
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') closeCart();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  // Блокировка скролла фона
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-label="Корзина"
      >
        <div className={styles.header}>
          <h2 className={styles.heading}>Корзина</h2>
          <button
            type="button"
            onClick={closeCart}
            className={styles.close}
            aria-label="Закрыть корзину"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <p>Корзина пуста</p>
              <Link to="/catalog" onClick={closeCart}>
                Перейти в каталог
              </Link>
            </div>
          ) : (
            items.map(item => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <CartSummary variant="drawer" />
          </div>
        )}
      </aside>
    </>
  );
}