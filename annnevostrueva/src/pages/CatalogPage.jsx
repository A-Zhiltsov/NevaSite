import { useParams, Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import styles from './CatalogPage.module.css';

export default function CatalogPage() {
  const { categorySlug } = useParams();

  // сортируем категории по order
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  // фильтруем товары: если категория не выбрана — показываем все
  const filteredProducts = categorySlug
    ? products.filter(p => p.categoryId === categorySlug)
    : products;

  // определяем, существует ли такая категория (для пустого состояния)
  const categoryExists = categorySlug
    ? sortedCategories.some(c => c.id === categorySlug)
    : true;

  return (
    <>
      <h1 className={styles.title}>Каталог</h1>

      <nav className={styles.tabs}>
        <Link
          to="/catalog"
          className={`${styles.tab} ${!categorySlug ? styles.active : ''}`}
        >
          Все
        </Link>

        {sortedCategories.map(cat => (
          <Link
            key={cat.id}
            to={`/catalog/${cat.id}`}
            className={`${styles.tab} ${categorySlug === cat.id ? styles.active : ''}`}
          >
            {cat.title}
          </Link>
        ))}
      </nav>

      {!categoryExists ? (
        <p className={styles.empty}>Такой категории не существует</p>
      ) : filteredProducts.length === 0 ? (
        <p className={styles.empty}>В этой категории пока ничего нет</p>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}