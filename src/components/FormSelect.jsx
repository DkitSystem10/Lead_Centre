const FormSelect = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [], 
  error, 
  required = false,
  placeholder = 'Select an option'
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
          className={`input-modern w-full px-3 py-2.5 border rounded-md focus:outline-none text-sm appearance-none cursor-pointer ${
            error 
              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 bg-white focus:border-[#409891] focus:ring-[#409891]/30'
          }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormSelect
