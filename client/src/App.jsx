import { useState } from 'react'
import { useWallet } from './hooks/useWallet'
import WalletPage from './pages/WalletPage'
import TransactionsPage from './pages/TransactionsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('wallet')
  const { wallet, transactions, initializeWallet, processTransaction, loading, error, loadMoreTransactions, clearError} = useWallet()

  const handleTransaction = async (amount, type, description) => {
    console.log(description, "des")
    return await processTransaction(amount, description, type)
  }

  const handleNavigateToTransactions = () => {
    setCurrentPage('transactions')
  }

  const handleNavigateToWallet = () => {
    setCurrentPage('wallet')
  }

  const handleWalletSetup = async (username, initialBalance) => {
    const success = await initializeWallet(username, initialBalance)
    return success
  }

  const handleLoadMoreTransactions = async (skip, limit) => {
    return await loadMoreTransactions(skip, limit)
  }

  if (currentPage === 'transactions') {
    return (
      <TransactionsPage
        wallet={wallet}
        transactions={transactions}
        onNavigateToWallet={handleNavigateToWallet}
        onLoadMoreTransactions={handleLoadMoreTransactions}
        error={error}
        onClearError={clearError}
        loading={loading}
      />
    )
  }

  return (
    <WalletPage
      wallet={wallet}
      onWalletSetup={handleWalletSetup}
      onTransaction={handleTransaction}
      onNavigateToTransactions={handleNavigateToTransactions}
      loading={loading}
      error={error}
      onClearError={clearError}
    />
  )
}

export default App
