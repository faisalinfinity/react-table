import styles from "../styles/loader.module.css";

const Loader = () => {
  return (
    <div className={styles.main}>
      <section className={styles.dotsContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={styles.dot}></div>
        ))}
      </section>
    </div>
  );
};

export default Loader;
