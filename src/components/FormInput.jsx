const FormInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder = '',
  min,
  max,
  disabled = false,
  readOnly = false
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        readOnly={readOnly}
        className={`input-modern w-full px-3 py-2.5 border rounded-md focus:outline-none text-sm ${
          error 
            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-300 bg-white focus:border-[#409891] focus:ring-[#409891]/30'
        } ${disabled || readOnly ? 'bg-gray-50 cursor-not-allowed text-gray-500' : ''} 
        placeholder:text-gray-400`}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormInput
