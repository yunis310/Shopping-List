import React, { useContext, useState } from "react";
import Data from "../pages/Data";
import ListItem from "./ListItem";
import styles from "../styles/Home.module.css";
import { AiOutlineArrowUp, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  deleteField,
} from "firebase/firestore";
import { motion } from "framer-motion";

function Lists() {
  const { stores, collectionRef } = useContext(Data);
  const [isDoneActive, setIsDoneActive] = useState(false);

  async function deletItem(id, name) {
    const docRef = doc(collectionRef, id);
    await updateDoc(docRef, {
      list: arrayRemove(name),
      done: arrayUnion(name),
    });
  }

  async function moveUpItem(id, name) {
    const docRef = doc(collectionRef, id);
    await updateDoc(docRef, {
      list: arrayUnion(name),
      done: arrayRemove(name),
    });
  }

  async function ClearDone() {
    stores.map(async (store) => {
      const docRef = doc(collectionRef, store.id);
      await updateDoc(docRef, {
        done: deleteField(),
      });
    });
  }

  return (
    <div className={styles.listContainer}>
      {stores?.map((store) => {
        return (
          <ListItem
            key={store.id}
            id={store.id}
            store={store.name}
            list={store.list}
            deletItem={deletItem}
          >
            {store.list}
          </ListItem>
        );
      })}
      <ul>
        <h5 onClick={(e) => setIsDoneActive(!isDoneActive)}>
          {isDoneActive ? (
            <AiOutlineUp className={styles.arrowIcon} />
          ) : (
            <AiOutlineDown className={styles.arrowIcon} />
          )}
          Done
        </h5>

        {isDoneActive && (
          <motion.p
            initial={{ x: -95, scale: 0 }}
            animate={{ x: 0, scale: 1 }}
            exit={{ x: -95, scale: 0 }}
            onClick={ClearDone}
          >
            Delete All
          </motion.p>
        )}
        {isDoneActive &&
          stores?.map((store) => {
            return store.done?.map((item, i) => {
              return (
                <motion.li
                  initial={{ x: -95, scale: 0 }}
                  animate={{ x: 0, scale: 1 }}
                  exit={{ x: -95, scale: 0 }}
                  className={styles.listItems}
                  key={i}
                >
                  <AiOutlineArrowUp
                    onClick={(e) => {
                      moveUpItem(store.id, item);
                    }}
                    className={styles.moveUpIcon}
                  />
                  {item} <span>{store.name}</span>
                </motion.li>
              );
            });
          })}
      </ul>
    </div>
  );
}

export default Lists;
