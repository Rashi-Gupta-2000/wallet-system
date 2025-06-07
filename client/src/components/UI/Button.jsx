import '../../styles/Button.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
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
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button