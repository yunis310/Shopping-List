import React, { useState, createContext } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [sellectedStore, setSellectedStore] = useState({
    name: "Select a store",
    id: "",
  });

  return (
    <DataContext.Provider value={{ sellectedStore, setSellectedStore }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
