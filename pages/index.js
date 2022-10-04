import Head from "next/head";
import ItemInput from "../components/ItemInput";
import Lists from "../components/Lists";
import Stores from "../components/Stores";
import styles from "../styles/Home.module.css";

import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { DataProvider } from "./Data";

export default function Home({ data }) {
  const collectionRef = collection(db, "stores");
  const [stores, setStores] = useState(JSON.parse(data));
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collectionRef), (snapshot) => {
      setStores(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping-List</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.shopping}>
          <h1>Shopping List</h1>
          <DataProvider>
            <Stores stores={stores} />
            <ItemInput />
          </DataProvider>
          <Lists stores={stores} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const storess = [];
  const collectionRef = collection(db, "stores");
  const q = query(collectionRef);
  const data = await getDocs(q);
  data.forEach((doc) => {
    storess.push({ ...doc.data(), id: doc.id });
  });
  return {
    props: { data: JSON.stringify(storess) },
  };
}
