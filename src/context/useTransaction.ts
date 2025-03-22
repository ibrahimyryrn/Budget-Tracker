import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

// 📌 Context'i kolay kullanmak için özel hook
export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
