import React, { useContext, useRef } from "react";
import styles from "../styles/Home.module.css";
import { doc, updateDoc, arrayUnion, collection } from "firebase/firestore";
import { db } from "../firebase";
import Data from "../pages/Data";

function ItemInput() {
  const { sellectedStore } = useContext(Data);
  const collectionRef = collection(db, "stores");

  const inputRef = useRef(null);

  async function addItem(e) {
    e.preventDefault();

    const reqLength = inputRef.current.value;
    if (!sellectedStore.id) {
      window.alert("Please sellect a store");
    } else {
      const docRef = doc(collectionRef, sellectedStore.id);
      if (/[a-zA-Z]/.test(reqLength)) {
        await updateDoc(docRef, {
          list: arrayUnion(inputRef.current.value),
        });
        inputRef.current.value = "";
      } else {
        window.alert("Item name should contain at least one character");
      }
    }
  }

  return (
    <form className={styles.inputItems}>
      <input
        maxLength={20}
        type="text"
        placeholder="Add Items"
        ref={inputRef}
      />
      <button hidden type="submit" onClick={addItem} />
    </form>
  );
}

export default ItemInput;
