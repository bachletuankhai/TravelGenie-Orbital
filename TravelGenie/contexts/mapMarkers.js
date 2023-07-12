import { createContext, useContext, useState } from "react";

const MarkersContext = createContext({});

export function useMarkerContext() {
  return useContext(MarkersContext);
}

export function MarkerProvider({ children }) {
  const [markers, setMarkers] = useState([]);

  return (
    <MarkersContext.Provider value={{ markers, setMarkers }}>
      {children}
    </MarkersContext.Provider>
  );
}
