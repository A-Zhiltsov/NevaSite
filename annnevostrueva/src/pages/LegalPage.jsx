import styles from './LegalPage.module.css';

export default function LegalPage({ title, children }) {
  return (
    <article className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>{children}</div>
    </article>
  );
}