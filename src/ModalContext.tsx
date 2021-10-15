import { createContext, ReactNode, useState } from "react";

interface CreateContext {
  isNewTransactionModalOpen: boolean;
  setIsNewTransactionModalOpen: (value: boolean) => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalContext = createContext<CreateContext>({} as CreateContext);

export function ModalProvider({ children }: ModalProviderProps) {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  return (
    <ModalContext.Provider
      value={{ isNewTransactionModalOpen, setIsNewTransactionModalOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
}
