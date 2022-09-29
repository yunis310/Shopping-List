import React, { useEffect, useState, createContext } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [stores, setStors] = useState([]);
  const [sellectedStore, setSellectedStore] = useState({
    name: "Select a store",
    id: "",
  });

  const collectionRef = collection(db, "stores");

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collectionRef), (snapshot) => {
      setStors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }, []);

  return (
    <DataContext.Provider
      value={{ stores, collectionRef, sellectedStore, setSellectedStore }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
