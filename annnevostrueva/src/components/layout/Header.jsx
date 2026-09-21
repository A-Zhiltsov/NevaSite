import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.css';

export default function Header() {
  const { totalCount, openCart } = useCart();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>Shop</Link>
        <nav className={styles.nav}>
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/terms">Оферта</NavLink>
          <NavLink to="/privacy">Политика конфиденциальности</NavLink>
          <button
            type="button"
            className={styles.cartBtn}
            onClick={openCart}
            aria-label="Открыть корзину"
          >
            🛒
            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}