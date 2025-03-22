import { createContext } from "react";

interface TransactionFormData {
  id: number;
  transaction_type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  transaction_date: Date;
  created_at: Date;
}

export interface TransactionContextType {
  transactions: TransactionFormData[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  refreshTransactions: () => void;
}

export const TransactionContext = createContext<
  TransactionContextType | undefined
>(undefined);
