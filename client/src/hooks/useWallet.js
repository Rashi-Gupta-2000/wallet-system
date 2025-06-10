import { useState, useCallback, useEffect } from "react";
import { walletApi } from "../api/walletApi";

export const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStoredWallet = async () => {
      try {
        const storedWalletId = localStorage.getItem("walletId");
        if (storedWalletId) {
          setLoading(true);
          const walletData = await walletApi.getWallet(storedWalletId);
          setWallet(walletData);

          const transactionsData = await walletApi.getTransactions(
            storedWalletId,
            0,
            100
          );
          setTransactions(transactionsData);
        }
      } catch (err) {
        console.error("Failed to load stored wallet:", err);
        localStorage.removeItem("walletId"); // Remove invalid wallet ID
        setError("Failed to load stored wallet data");
      } finally {
        setLoading(false);
      }
    };

    loadStoredWallet();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const initializeWallet = useCallback(async (username, initialBalance = 0) => {
    if (!username.trim()) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await walletApi.createWallet(
        username.trim(),
        parseFloat(initialBalance) || 0
      );
      setWallet(response);

      // Store wallet ID in localStorage
      localStorage.setItem("walletId", response.id);

      // Fetch initial transactions (setup transaction)
      const transactionsResponse = await walletApi.getTransactions(
        response.id,
        0,
        100
      );
      setTransactions(transactionsResponse);

      return true;
    } catch (err) {
      setError(err.message || "Failed to create wallet");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const processTransaction = useCallback(
    async (amount, description = "", type) => {
      console.log(description, "process");
      if (!wallet || !amount || parseFloat(amount) === 0 || !type) return false;

      setLoading(true);
      setError(null);

      try {
        let transactionAmount = parseFloat(amount);

        await walletApi.createTransaction(
          wallet.id,
          transactionAmount,
          description
        );

        const updatedWallet = await walletApi.getWallet(wallet.id);
        setWallet(updatedWallet);

        const updatedTransactions = await walletApi.getTransactions(
          wallet.id,
          0,
          100
        );
        setTransactions(updatedTransactions);

        return true;
      } catch (err) {
        setError(err.message || "Transaction failed");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [wallet]
  );

  const loadMoreTransactions = useCallback(
    async (skip = 0, limit = 10) => {
      if (!wallet) return [];

      setLoading(true);
      setError(null);

      try {
        const response = await walletApi.getTransactions(
          wallet.id,
          skip,
          limit
        );
        return response;
      } catch (err) {
        setError(err.message || "Failed to load transactions");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [wallet]
  );

  return {
    wallet,
    transactions,
    loading,
    error,
    initializeWallet,
    processTransaction,
    loadMoreTransactions,
    clearError,
  };
};
