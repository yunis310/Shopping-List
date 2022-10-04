import React, { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { TiDelete } from "react-icons/ti";
import { AiOutlineEdit } from "react-icons/ai";

function Store({ store, id, delet, edit, selected }) {
  const [isEdit, setEdit] = useState(true);
  const inputRef = useRef();

  function editStore(e) {
    e.preventDefault();
    e.stopPropagation();
    const reqLength = inputRef.current.value;
    if (/[a-zA-Z]/.test(reqLength)) {
      setEdit(true);
      edit(id, inputRef.current.value);
    } else {
      window.alert("Store name should contain at least one character");
    }
  }

  return (
    <li className={styles.storeLists}>
      {isEdit ? (
        <h4 onClick={() => selected(store, id)} className={styles.storeList}>
          {store}
          <TiDelete
            className={styles.deleteicon}
            onClick={(e) => {
              delet(id), e.stopPropagation();
            }}
          />
          <AiOutlineEdit
            className={styles.editicon}
            onClick={(e) => {
              setEdit(false), e.stopPropagation();
            }}
          />
        </h4>
      ) : (
        <form>
          <input
            maxLength={10}
            type="text"
            placeholder={store}
            ref={inputRef}
          />
          <button hidden type="submit" onClick={editStore} />
        </form>
      )}
    </li>
  );
}
export default Store;
