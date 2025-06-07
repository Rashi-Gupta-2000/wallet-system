import WalletSetup from '../components/Wallet/WalletSetup'
import WalletBalance from '../components/Wallet/WalletBalance'
import TransactionForm from '../components/Wallet/TransactionForm'
import Button from '../components/UI/Button'
import '../styles/Layout.css'

const WalletPage = ({ wallet, onWalletSetup, onTransaction, onNavigateToTransactions }) => {
  return (
    <div className="pageContainer">
      <div className="contentContainer">
        <h1 className="pageTitle">Digital Wallet</h1>
        
        {!wallet ? (
          <WalletSetup onSetup={onWalletSetup} />
        ) : (
          <div className="sectionSpacing">
            <WalletBalance wallet={wallet} />
            <TransactionForm onTransaction={onTransaction} />
            <div className="centerContent">
              <Button onClick={onNavigateToTransactions}>
                View Transaction History
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WalletPage