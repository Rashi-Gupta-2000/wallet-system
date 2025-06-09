import Card from '../UI/Card'
import { formatCurrency } from '../../utils/formatters'
import '../../styles/WalletBalance.css'

const WalletBalance = ({ wallet }) => {
  return (
    <Card>
      <div className="balanceContainer">
        <h2 className="balanceTitle">Welcome, {wallet.name}!</h2>
        <div className="balanceAmount">
          {formatCurrency(wallet.balance)}
        </div>
        <p className="balanceLabel">Current Balance</p>
      </div>
    </Card>
  )
}

export default WalletBalance
