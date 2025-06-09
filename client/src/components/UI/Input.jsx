import '../../styles/Input.css'

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  className = '',
  error = null,
  ...props 
}) => {
  return (
    <div className="inputContainer">
      {label && (
        <label className="inputLabel">
          {label} {required && <span className="inputRequired">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default Input