import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { TiDelete } from "react-icons/ti";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

function ListItem({ id, store, list, deletItem }) {
  const [isActive, setIsActive] = useState(false);

  function hendelClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(!isActive);
  }

  return (
    <ul>
      <h4 onClick={hendelClick}>
        {isActive ? (
          <AiOutlineUp className={styles.arrowIcon} />
        ) : (
          <AiOutlineDown className={styles.arrowIcon} />
        )}
        {store}
      </h4>
      <AnimatePresence>
        {isActive && Array.isArray(list)
          ? list.map((item, i) => {
              return (
                <motion.li
                  className={styles.listItems}
                  key={i}
                  initial={{ x: -95, scale: 0 }}
                  animate={{ x: 0, scale: 1 }}
                  exit={{ x: -95, scale: 0 }}
                >
                  <TiDelete
                    className={styles.deleteItemIcon}
                    onClick={(e) => deletItem(id, item)}
                  />
                  {item}
                </motion.li>
              );
            })
          : null}
      </AnimatePresence>
    </ul>
  );
}

export default ListItem;
