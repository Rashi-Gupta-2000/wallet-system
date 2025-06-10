import { useState } from 'react'
import Card from '../UI/Card'
import Input from '../UI/Input'
import Button from '../UI/Button'
import '../../styles/TransactionForm.css'
import ErrorMessage from '../UI/ErrorMessage'

const TransactionForm = ({ onTransaction, loading, error, onClearError }) => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('CREDIT')

  const handleSubmit = async (e) => {
    console.log(description)
    e.preventDefault()
    if (amount && parseFloat(amount) > 0) {
      const transactionAmount = type === 'CREDIT' 
        ? parseFloat(amount) 
        : -parseFloat(amount)

      const success = await onTransaction(transactionAmount, type, description.trim() || '-')
      if (success) {
        setAmount('')
        setDescription('')
        setType('CREDIT');
      }
    }
  }

  return (
    <Card>
      <h3 className="formTitle">New Transaction</h3>
      <ErrorMessage error={error} onDismiss={onClearError} />
      <form onSubmit={handleSubmit} className="formContainer">
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          min="0.01"
          step="0.01"
          required
          disabled={loading}
        />
        <div>
          <label className="inputLabel">Transaction Type</label>
          <div className="radioGroup">
            <label className="radioOption">
              <input
                type="radio"
                value="CREDIT"
                checked={type === 'CREDIT'}
                onChange={(e) => setType(e.target.value)}
                className="radioInput"
              />
              Credit (Add Money)
            </label>
            <label className="radioOption">
              <input
                type="radio"
                value="DEBIT"
                checked={type === 'DEBIT'}
                onChange={(e) => setType(e.target.value)}
                className="radioInput"
              />
              Debit (Spend Money)
            </label>
          </div>
        </div>
        <Input
          label="Description (Optional)"
          type="text"
          value={description}
          onChange={(e) => {
            console.log(e.target.value)
            setDescription(e.target.value)
          }}
          placeholder="Enter transaction description..."
          maxLength="100"
          disabled={loading}
        />
        <div className='centerContent'>
          <Button 
            type="submit" 
            variant="success" 
            fullWidth
            loading={loading}
            disabled={!amount || parseFloat(amount) <= 0 || loading}
          >
            Submit Transaction
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default TransactionForm
