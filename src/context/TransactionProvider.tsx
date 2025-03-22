import { useState, useEffect } from "react";
import { TransactionContext } from "./TransactionContext";
import { GetItems } from "../api/endpoints";
import { getCookies } from "../lib/cookies";

interface TransactionFormData {
  id: number;
  transaction_type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  transaction_date: Date;
  created_at: Date;
}

interface TransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionFormData[]>([]);

  // 📌 API'den veriyi çek

  const fetchTransactions = async () => {
    try {
      const { user_id } = getCookies();
      const data = await GetItems(user_id);
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // 📌 Toplam gelir hesapla
  const totalIncome = transactions
    .filter((transaction) => transaction.transaction_type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // 📌 Toplam gider hesapla
  const totalExpenses = transactions
    .filter((transaction) => transaction.transaction_type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // 📌 Bakiye hesapla
  const balance = totalIncome - totalExpenses;

  const refreshTransactions = () => {
    fetchTransactions();
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        totalIncome,
        totalExpenses,
        balance,
        refreshTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
