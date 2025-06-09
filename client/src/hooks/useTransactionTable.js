import { useState, useMemo, useCallback } from "react";

export const useTransactionTable = (transactions, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [allTransactions, setAllTransactions] = useState(transactions);

  useState(() => {
    setAllTransactions(transactions);
  }, [transactions]);

  const sortedTransactions = useMemo(() => {
    return [...allTransactions].sort((a, b) => {
      let aVal, bVal;

      if (sortField === "date") {
        aVal = new Date(a.date);
        bVal = new Date(b.date);
      } else if (sortField === "amount") {
        aVal = a.amount;
        bVal = b.amount;
      }

      return sortOrder === "asc"
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });
  }, [allTransactions, sortField, sortOrder]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);

  const handleSort = useCallback(
    (field) => {
      if (sortField === field) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortOrder("desc");
      }
      setCurrentPage(1);
    },
    [sortField, sortOrder]
  );

  const loadMoreTransactions = useCallback((newTransactions) => {
    setAllTransactions((prev) => {
      const existingIds = new Set(prev.map((t) => t.id));
      const uniqueNew = newTransactions.filter((t) => !existingIds.has(t.id));
      return [...prev, ...uniqueNew];
    });
  }, []);

  return {
    paginatedTransactions,
    sortedTransactions,
    allTransactions,
    currentPage,
    totalPages,
    sortField,
    sortOrder,
    setCurrentPage,
    handleSort,
    loadMoreTransactions,
  };
};
