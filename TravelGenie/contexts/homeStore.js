import { createContext, useCallback, useContext } from "react";
import _ from 'lodash';

const StoreContext = createContext({
  getItem: () => {},
  setItem: () => {},
  deleteItem: () => {},
});

export function useStore() {
  return useContext(StoreContext);
}

const store = {};

export function StoreProvider({ children }) {
  const getItem = useCallback((name) => {
    return store[name] || null;
  }, []);

  const setItem = useCallback((name, value) => {
    store[name] = _.cloneDeep(value);
  }, []);

  const deleteItem = useCallback((name) => {
    delete store[name];
  }, []);

  return (
    <StoreContext.Provider value={{ getItem, setItem, deleteItem }}>
      { children }
    </StoreContext.Provider>
  );
}
