export const exportTransactionsToCSV = (transactions, username) => {
  const headers = [
    "Date",
    "Type",
    "Amount (₹)",
    "Balance (₹)",
    "Description",
  ];
  const csvContent = [
    headers.join(","),
    ...transactions.map((t) =>
      [
        new Date(t.date).toLocaleDateString(),
        t.type,
        t.amount.toFixed(2),
        `"${t.description || ""}"`,
        t.balance.toFixed(2),
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `wallet-transactions-${username || "user"}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
