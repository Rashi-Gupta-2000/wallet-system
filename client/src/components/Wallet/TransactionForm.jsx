import { useState } from 'react'
import Card from '../UI/Card'
import Input from '../UI/Input'
import Button from '../UI/Button'
import '../../styles/TransactionForm.css'

const TransactionForm = ({ onTransaction }) => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('CREDIT')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (amount && parseFloat(amount) > 0) {
      const success = onTransaction(amount, type, description)
      if (success) {
        setAmount('')
        setDescription('')
      }
    }
  }

  return (
    <Card>
      <h3 className="formTitle">New Transaction</h3>
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
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter transaction description..."
          maxLength="100"
        />
        <div className='centerContent'>
          <Button 
            type="submit" 
            variant="success" 
            fullWidth
            disabled={!amount || parseFloat(amount) <= 0}
          >
            Submit Transaction
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default TransactionForm
