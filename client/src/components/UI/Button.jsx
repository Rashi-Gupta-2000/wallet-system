import '../../styles/Button.css'
import LoadingSpinner from './LoadingSpinner';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  onClick, 
  className = '',
  fullWidth = false,
  ...props 
}) => {
  const classes = [
    'button',
    variant,
    size,
    fullWidth ? 'fullWidth' : '',
    className
  ].filter(Boolean).join(' ')
  
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  )
}

export default Button