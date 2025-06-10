import "../../styles/Loading.css"

const LoadingSpinner = ({ size = 'md', spacing = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'spinner-sm',
    md: 'spinner-md',
    lg: 'spinner-lg'
  }

  const spacingClasses = {
    sm: 'spinner-spacing-sm',
    md: 'spinner-spacing-md',
    lg: 'spinner-spacing-lg'
  }

  return (
    <div className={`spinner ${sizeClasses[size]} ${spacingClasses[spacing]} ${className}`}>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSpinner
