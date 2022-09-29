import styles from "../styles/Home.module.css";
import React, { useState, useContext, useRef, useEffect } from "react";
import {
  serverTimestamp,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import Data from "../pages/Data";
import Store from "./Store";

function Stores() {
  const [isActive, setIsActive] = useState(false);
  const { stores, collectionRef, sellectedStore, setSellectedStore } =
    useContext(Data);
  const inputRef = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    function handleClick(e) {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        setIsActive(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isActive]);

  useEffect(() => {
    const foundStore = stores.find((store) => {
      return store.name === sellectedStore.name;
    });
    const isEmpty = sellectedStore.name === "Select a store";

    foundStore || isEmpty
      ? null
      : (setSellectedStore({
          name: "Select a store",
          id: "",
        }),
        setIsActive(false));
  }, [JSON.stringify(stores)]);

  function handelSellection(store, id) {
    setSellectedStore({ name: store, id: id });
    setIsActive(false);
  }

  // Add Store
  async function addStore(e) {
    const reqLength = inputRef.current.value.length;
    e.preventDefault();
    if (reqLength > 2) {
      await addDoc(collectionRef, {
        name: inputRef.current.value,
        list: [],
        done: [],
        timestamp: serverTimestamp(),
      });
      inputRef.current.value = "";
    } else {
      window.alert("Store name should be 2-10 characters");
    }
  }

  // Delet Store
  async function deletStore(id) {
    const docRef = doc(db, "stores", id);
    await deleteDoc(docRef);
    console.log("Store was deleted sucssesfully");
  }

  // Edit Store
  async function editStore(id, value) {
    const docRef = doc(db, "stores", id);
    await updateDoc(docRef, { name: value, timestamp: serverTimestamp() });
  }
  const variants = {
    open: { y: 0, display: 1, scale: 1 },
    closed: { y: -70, display: 0, scale: 0 },
  };

  return (
    <div className={styles.mainDropDown}>
      <ul ref={dropdown}>
        <h2
          onClick={() => setIsActive(!isActive)}
          className={styles.selectedStore}
        >
          {sellectedStore.name}
        </h2>
        <AnimatePresence>
          {isActive && (
            <motion.div
              className={styles.dropDown}
              initial={{ y: -70, display: 0, scale: 0 }}
              animate={isActive ? "open" : "closed"}
              transition={{ duration: 0.3 }}
              variants={variants}
            >
              <form>
                <input
                  maxLength={10}
                  type="text"
                  ref={inputRef}
                  placeholder="Add Store"
                />
                <button hidden type="submit" onClick={addStore} />
              </form>
              <hr />
              {stores?.map((store) => (
                <Store
                  key={store.id}
                  id={store.id}
                  store={store.name}
                  value={store.name}
                  delet={deletStore}
                  edit={editStore}
                  selected={handelSellection}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default Stores;
