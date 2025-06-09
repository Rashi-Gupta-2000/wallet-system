import { formatCurrency, formatDate } from '../../utils/formatters'
import '../../styles/TransactionTable.css'

const TransactionTable = ({ transactions, sortField, sortOrder, onSort }) => {
  const SortableHeader = ({ field, children }) => (
    <th 
      className="tableHeaderCell sortableHeader"
      onClick={() => onSort(field)}
      title={`Click to sort by ${field}`}
    >
      <div className="sortIndicator">
        <span>{children}</span>
        <div className="sortArrows">
          <span className={sortField === field && sortOrder === 'asc' ? 'sortArrowActive' : 'sortArrowInactive'}>▲</span>
          <span className={sortField === field && sortOrder === 'desc' ? 'sortArrowActive' : 'sortArrowInactive'}>▼</span>
        </div>
      </div>
    </th>
  )

  return (
    <div className="tableContainer">
      <table className="table">
        <thead className="tableHeader">
          <tr className="tableHeaderRow">
            <SortableHeader field="date">Date</SortableHeader>
            <th className="tableHeaderCell">Type</th>
            <SortableHeader field="amount">Amount</SortableHeader>
            <th className="tableHeaderCell">Description</th>
            <th className="tableHeaderCell">Balance After</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="tableRow">
              <td className="tableCell">{formatDate(transaction.date)}</td>
              <td className="tableCell">
                <span className={`transactionBadge ${
                  transaction.type === 'CREDIT' ? 'transactionCredit' : 'transactionDebit'
                }`}>
                  {transaction.type}
                </span>
              </td>
              <td className={`tableCell ${
                transaction.type === 'CREDIT' ? 'amountCredit' : 'amountDebit'
              }`}>
                {transaction.type === 'CREDIT' ? '+' : ''}{formatCurrency(transaction.amount)}
              </td>
              <td className="tableCell">
                {transaction.description || '-'}
              </td>
              <td className="tableCell">{formatCurrency(transaction.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
