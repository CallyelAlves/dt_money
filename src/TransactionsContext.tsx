import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api';

interface Transaction {
  id: number;
  title: string;
  value: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

type CreateTransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: CreateTransactionInput) => Promise<void>;
  setTransactions: (transaction: Transaction[]) => void;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("transactions").then((response) => {
      const transaction: any = response.data;
      setTransactions(transaction.transactions);
    });
  }, []);

  async function createTransaction(transactionInput: CreateTransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction }: any = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, setTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}