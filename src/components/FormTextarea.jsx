const FormTextarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder = '',
  rows = 4
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`input-modern w-full px-3 py-2.5 border rounded-md focus:outline-none text-sm resize-vertical ${
          error 
            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-300 bg-white focus:border-[#409891] focus:ring-[#409891]/30'
        } placeholder:text-gray-400`}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormTextarea
