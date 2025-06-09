import { useState } from 'react'
import { useWallet } from './hooks/useWallet'
import WalletPage from './pages/WalletPage'
import TransactionsPage from './pages/TransactionsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('wallet')
  const { wallet, transactions, initializeWallet, processTransaction } = useWallet()

  const handleWalletSetup = (username, initialBalance) => {
    initializeWallet(username, initialBalance)
  }

  const handleTransaction = (amount, type, description) => {
    return processTransaction(amount, type, description)
  }

  const handleNavigateToTransactions = () => {
    setCurrentPage('transactions')
  }

  const handleNavigateToWallet = () => {
    setCurrentPage('wallet')
  }

  if (currentPage === 'transactions') {
    return (
      <TransactionsPage
        wallet={wallet}
        transactions={transactions}
        onNavigateToWallet={handleNavigateToWallet}
      />
    )
  }

  return (
    <WalletPage
      wallet={wallet}
      onWalletSetup={handleWalletSetup}
      onTransaction={handleTransaction}
      onNavigateToTransactions={handleNavigateToTransactions}
    />
  )
}

export default App
