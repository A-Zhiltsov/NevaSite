import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';
import styles from './HomePage.module.css';
import ownerIMG from '../img/Owner.jpg';

export default function HomePage() {
  return (
    <>
      <section class={styles.hero}>
          <div class={styles.heroText}>
            <h1>Привет, я Аня!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto quisquam harum, 
              repellendus laborum adipisci pariatur velit odio non, distinctio cupiditate quia labore 
              rerum dolorum expedita ipsum quaerat asperiores, explicabo esse?</p>
          </div>
          <div class={styles.heroImage}>
            <img src={ownerIMG} alt='Это я'/>
          </div>
      </section>
      <h1 className={styles.title}>Витрина</h1>
      <div className={styles.grid}>
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}