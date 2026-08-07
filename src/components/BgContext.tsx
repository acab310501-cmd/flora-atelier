import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type BgContextType = {
  bg: string;
  setBg: (color: string) => void;
};

const BgContext = createContext<BgContextType>({ bg: '#FDF8F5', setBg: () => {} });

export function useBg() {
  return useContext(BgContext);
}

export function BgProvider({ children }: { children: ReactNode }) {
  const [bg, setBgState] = useState('#FDF8F5');

  const setBg = useCallback((color: string) => {
    setBgState(color);
  }, []);

  return (
    <BgContext.Provider value={{ bg, setBg }}>
      {children}
    </BgContext.Provider>
  );
}
