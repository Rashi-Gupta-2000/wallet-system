import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import TransactionTable from '../components/Transactions/TransactionTable'
import Pagination from '../components/Transactions/Pagination'
import { useTransactionTable } from '../hooks/useTransactionTable'
import { exportTransactionsToCSV } from '../utils/csvExport'
import ErrorMessage from '../components/UI/ErrorMessage'
import '../styles/Layout.css'
import '../styles/EmptyState.css'

const TransactionsPage = ({ wallet, transactions, onNavigateToWallet,
  error,
  onClearError,
 }) => {
  const {
    paginatedTransactions,
    sortedTransactions,
    currentPage,
    totalPages,
    sortField,
    sortOrder,
    setCurrentPage,
    handleSort,
  } = useTransactionTable(transactions)

  console.log(transactions);

  const handleExport = () => {
    exportTransactionsToCSV(sortedTransactions, wallet?.username)
  }

  return (
    <div className="pageContainer">
      <div className="wideContentContainer">
        <div className="pageHeader">
          <h1 className="pageTitle">Transaction History</h1>
          <Button variant="secondary" onClick={onNavigateToWallet}>
            Back to Wallet
          </Button>
        </div>

        <ErrorMessage error={error} onDismiss={onClearError} />

        {wallet && (
          <Card>
            <div className="pageHeader">
              <div>
                <h2 className="formTitle">{wallet.name}'s Transactions</h2>
                <p className="balanceLabel">Total: {transactions.length} transactions</p>
              </div>
              <Button
                variant="success"
                onClick={handleExport}
                disabled={transactions.length === 0}
              >
                Export CSV
              </Button>
            </div>

            {transactions.length === 0 ? (
              <p className="emptyState">No transactions yet</p>
            ) : (
              <>
                <TransactionTable
                  transactions={paginatedTransactions}
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}

export default TransactionsPage