// Validation utility functions

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== ''
}

export const validateMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength
}

export const validateFile = (file, allowedTypes = [], maxSize = 5 * 1024 * 1024) => {
  if (!file) return true // File is optional unless required
  if (file.size > maxSize) {
    return { valid: false, message: `File size should be less than ${maxSize / (1024 * 1024)}MB` }
  }
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { valid: false, message: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` }
  }
  return { valid: true }
}

export const getTodayDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}













