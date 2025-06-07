import { useState } from "react";

export const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const initializeWallet = (username, initialBalance = 0) => {
    if (!username.trim()) return false;

    const newWallet = {
      id: Date.now().toString(),
      username: username.trim(),
      balance: parseFloat(initialBalance) || 0,
    };

    setWallet(newWallet);
    return true;
  };

  const processTransaction = (amount, type) => {
    if (!wallet || !amount || parseFloat(amount) <= 0) return false;

    const transactionAmount = parseFloat(amount);
    const newBalance =
      type === "CREDIT"
        ? wallet.balance + transactionAmount
        : wallet.balance - transactionAmount;

    const newTransaction = {
      id: Date.now().toString(),
      amount: transactionAmount,
      type,
      date: new Date().toISOString(),
      balance: newBalance,
    };

    setWallet((prev) => ({ ...prev, balance: newBalance }));
    setTransactions((prev) => [newTransaction, ...prev]);
    return true;
  };

  return {
    wallet,
    transactions,
    initializeWallet,
    processTransaction,
  };
};
