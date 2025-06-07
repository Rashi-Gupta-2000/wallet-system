import '../../styles/Input.css'

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  className = '',
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
    </div>
  )
}

export default Input