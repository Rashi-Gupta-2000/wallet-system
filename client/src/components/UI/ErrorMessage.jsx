import "../../styles/ErrorMessage.css";

const ErrorMessage = ({ error, onDismiss }) => {
  if (!error) return null

  return (
    <div className="error-container">
      <div className="error-flex-container">
        <div className="error-content-flex">
          <div className="error-icon">⚠️</div>
          <div>
            <h3 className="error-title">Error</h3>
            <p className="error-text">{error}</p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="error-dismiss-button"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
  
  export default ErrorMessage