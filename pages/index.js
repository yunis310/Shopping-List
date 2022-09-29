import Head from "next/head";
import ItemInput from "../components/ItemInput";
import Lists from "../components/Lists";
import Stores from "../components/Stores";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping-List</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.shopping}>
          <h1>Shopping List</h1>
          <Stores />
          <ItemInput />
          <Lists />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
