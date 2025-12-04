const FileUpload = ({ 
  label, 
  name, 
  onChange, 
  error, 
  required = false,
  accept = '*/*',
  multiple = false,
  file = null
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center space-x-3">
        <label
          htmlFor={name}
          className={`group flex-1 cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 border rounded-md text-sm font-medium transition-colors duration-150 ${
            error
              ? 'border-red-300 bg-red-50 hover:border-red-400'
              : file
              ? 'border-[#0B3A62] bg-[#BADDFF]/20 text-[#0B3A62]'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          } focus-within:outline-none focus-within:ring-1 focus-within:ring-[#0B3A62]`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>{file ? file.name : 'Choose File'}</span>
          <input
            type="file"
            id={name}
            name={name}
            onChange={onChange}
            accept={accept}
            multiple={multiple}
            className="hidden"
          />
        </label>
      </div>
      {file && (
        <div className="mt-2 p-2.5 bg-[#BADDFF]/20 border border-[#0B3A62]/20 rounded-md">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Selected:</span> <span className="text-[#0B3A62] font-medium">{file.name}</span> <span className="text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
          </p>
        </div>
      )}
      {error && (
        <p className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default FileUpload
