import React, { useContext, useRef } from "react";
import styles from "../styles/Home.module.css";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import Data from "../pages/Data";

function ItemInput() {
  const { sellectedStore, collectionRef } = useContext(Data);
  const inputRef = useRef(null);

  async function addItem(e) {
    e.preventDefault();

    const reqLength = inputRef.current.value.length;
    if (!sellectedStore.id) {
      window.alert("Please sellect a store");
    } else {
      const docRef = doc(collectionRef, sellectedStore.id);
      if (reqLength > 2) {
        await updateDoc(docRef, {
          list: arrayUnion(inputRef.current.value),
        });
        inputRef.current.value = "";
      } else {
        window.alert("Item should be 2-20 characters");
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
