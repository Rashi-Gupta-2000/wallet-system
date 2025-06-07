import { useState, useMemo } from "react";

export const useTransactionTable = (transactions, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
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
  }, [transactions, sortField, sortOrder]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  return {
    paginatedTransactions,
    sortedTransactions,
    currentPage,
    totalPages,
    sortField,
    sortOrder,
    setCurrentPage,
    handleSort,
  };
};
