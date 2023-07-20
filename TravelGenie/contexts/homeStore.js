import { createContext, useCallback, useContext, useState } from "react";

const StoreContext = createContext({
  getItem,
  setItem,
  deleteItem,
});

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }) {
  const [store, setStore] = useState({});

  const getItem = useCallback((name) => {
    return store[name] || null;
  }, [store]);

  const setItem = useCallback((name, value) => {
    const newStore = {
      ...store,
    };
    newStore[name] = structuredClone(value);
    setStore(newStore);
  }, [store]);

  const deleteItem = useCallback((name) => {
    const newStore = {
      ...store,
    };
    delete newStore[name];
    setStore(newStore);
  }, [store]);

  return (
    <StoreContext.Provider value={{ getItem, setItem, deleteItem }}>
      { children }
    </StoreContext.Provider>
  );
}
