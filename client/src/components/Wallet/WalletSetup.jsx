import { useState } from 'react'
import Card from '../UI/Card'
import Input from '../UI/Input'
import Button from '../UI/Button'
import '../../styles/Layout.css'
import ErrorMessage from '../UI/ErrorMessage'

const WalletSetup = ({ onSetup,loading, error, onClearError }) => {
  const [username, setUsername] = useState('')
  const [initialBalance, setInitialBalance] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (username.trim()) {
      await onSetup(username, initialBalance)
    }
  }

  return (
    <Card>
      <h2 className="formTitle">Setup Your Wallet</h2>
      <ErrorMessage error={error} onDismiss={onClearError} />
      <form onSubmit={handleSubmit} className="formContainer">
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          disabled={loading}
        />
        <Input
          label="Initial Balance (Optional)"
          type="number"
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
          disabled={loading}
        />
         <div className='centerContent'>
          <Button
            type="submit"
            fullWidth
            loading={loading}
            disabled={!username.trim() || loading}
          >
            Create Wallet
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default WalletSetup