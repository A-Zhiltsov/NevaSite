import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { items } = useCart();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    delivery: 'cdek',
    comment: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // здесь позже будет запрос к бэкенду → создание платежа в ЮKassa
    alert('Оплата скоро появится');
  }

  // пустая корзина — форма бессмысленна
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h1>Корзина пуста</h1>
        <p>Добавьте товары, чтобы оформить заказ.</p>
        <Link to="/catalog" className={styles.backLink}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Оформление заказа</h1>

      <div className={styles.layout}>
        {/* === ФОРМА === */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Контактные данные</h2>

            <label className={styles.field}>
              <span className={styles.label}>Имя и фамилия *</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Телефон *</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+7 (___) ___-__-__"
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Email *</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Доставка</h2>

            <div className={styles.radios}>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="delivery"
                  value="cdek"
                  checked={form.delivery === 'cdek'}
                  onChange={handleChange}
                />
                <span>СДЭК</span>
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="delivery"
                  value="post"
                  checked={form.delivery === 'post'}
                  onChange={handleChange}
                />
                <span>Почта России</span>
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={form.delivery === 'pickup'}
                  onChange={handleChange}
                />
                <span>Самовывоз</span>
              </label>
            </div>

            {form.delivery !== 'pickup' && (
              <label className={styles.field}>
                <span className={styles.label}>Адрес *</span>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </label>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Комментарий</h2>
            <label className={styles.field}>
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                rows={3}
                className={styles.textarea}
              />
            </label>
          </section>
        </form>

        {/* === СВОДКА === */}
        <aside className={styles.summary}>
          <h2 className={styles.sectionTitle}>Ваш заказ</h2>

          <div className={styles.items}>
            {items.map(item => (
              <CartItem key={item.id} item={item} variant="full" />
            ))}
          </div>

          <CartSummary variant="checkout" />
        </aside>
      </div>
    </div>
  );
}