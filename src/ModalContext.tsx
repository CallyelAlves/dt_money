import { createContext, ReactNode, useState } from "react";

interface CreateContext {
  isNewTransactionModalOpen: boolean;
  isEditTransaction: boolean;
  id: number;
  setId: (value: number) => void;
  setIsEditTransaction: (value: boolean) => void;
  setIsNewTransactionModalOpen: (value: boolean) => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalContext = createContext<CreateContext>({} as CreateContext);

export function ModalProvider({ children }: ModalProviderProps) {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const [isEditTransaction, setIsEditTransaction] = useState(false);

  const [id, setId] = useState(0);

  return (
    <ModalContext.Provider
      value={{
        isNewTransactionModalOpen,
        setIsNewTransactionModalOpen,
        isEditTransaction,
        setIsEditTransaction,
        id,
        setId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
