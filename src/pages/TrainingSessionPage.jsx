import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
import { validateEmail, validateRequired, validatePhone, getTodayDate } from '../utils/validation'
import { submitTrainingSessionApplication } from '../utils/formSubmission'

const TrainingSessionPage = () => {
  const navigate = useNavigate()
  const [view, setView] = useState('categories') // 'categories', 'subcategories', 'form'
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    category: '',
    subCategory: '',
    name: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    age: '',
    address: '',
    courseEnquiry: '',
    remarks: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Main Categories
  const mainCategories = [
    {
      id: 'ai-robotics',
      title: 'School of AI & Robotics',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667EEA" />
              <stop offset="100%" stopColor="#764BA2" />
            </linearGradient>
          </defs>
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#aiGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    {
      id: 'languages',
      title: 'School of Languages',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="languageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F093FB" />
              <stop offset="100%" stopColor="#F5576C" />
            </linearGradient>
          </defs>
          <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" stroke="url(#languageGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#languageGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    {
      id: 'finance',
      title: 'School of Finance',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="financeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FA709A" />
              <stop offset="100%" stopColor="#FEE140" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" stroke="url(#financeGradient)" strokeWidth="2" fill="url(#financeGradient)" fillOpacity="0.1"/>
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" stroke="url(#financeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'business',
      title: 'School of Business',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="businessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ECDC4" />
              <stop offset="100%" stopColor="#44A08D" />
            </linearGradient>
          </defs>
          <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="url(#businessGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#businessGradient)" fillOpacity="0.1"/>
        </svg>
      )
    }
  ]

  // Sub-Categories by Main Category
  const subCategories = {
    'ai-robotics': [
      { id: 'k12-robotics', label: 'K-12 Robotics' },
      { id: 'aicra-courses', label: 'AICRA Courses' }
    ],
    'languages': [
      { id: 'indian-languages', label: 'Indian Languages' },
      { id: 'foreign-languages', label: 'Foreign Languages' }
    ],
    'finance': [
      { id: 'accounting-taxation', label: 'Accounting & Taxation' },
      { id: 'company-formation', label: 'Company Formation & Entrepreneurship' }
    ],
    'business': [
      { id: 'digital-business-admin', label: 'Digital Business Administration' },
      { id: 'digital-entrepreneurship', label: 'Digital Entrepreneurship Development' },
      { id: 'digital-content', label: 'Digital Content Development' },
      { id: 'digital-marketing', label: 'Digital Marketing' }
    ]
  }


  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    setView('subcategories')
  }

  const handleSubCategoryClick = (subCategoryId) => {
    const subCategory = subCategories[selectedCategory].find(sc => sc.id === subCategoryId)
    setSelectedSubCategory(subCategoryId)
    setFormData(prev => ({
      ...prev,
      category: mainCategories.find(c => c.id === selectedCategory)?.title || '',
      subCategory: subCategory?.label || ''
    }))
    setView('form')
  }

  const handleBackToCategories = () => {
    setView('categories')
    setSelectedCategory('')
    setSelectedSubCategory('')
  }

  const handleBackToSubCategories = () => {
    setView('subcategories')
    setSelectedSubCategory('')
  }

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return ''
    
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age >= 0 ? age.toString() : ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [name]: value
      }
      
      // Auto-calculate age when D.O.B changes
      if (name === 'dateOfBirth') {
        updatedData.age = calculateAge(value)
      }
      
      return updatedData
    })
    // Clear error for this field and age if D.O.B changes
    if (errors[name]) {
      setErrors(prev => {
        const updatedErrors = {
          ...prev,
          [name]: ''
        }
        // Clear age error when D.O.B changes
        if (name === 'dateOfBirth' && prev.age) {
          updatedErrors.age = ''
        }
        return updatedErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!validateRequired(formData.category)) {
      newErrors.category = 'Category is required'
    }
    if (!validateRequired(formData.subCategory)) {
      newErrors.subCategory = 'Sub-category is required'
    }
    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required'
    }
    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!validateRequired(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number is required'
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number'
    }
    if (!validateRequired(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Date of Birth is required'
    }
    if (!validateRequired(formData.age)) {
      newErrors.age = 'Age is required (calculated from D.O.B)'
    }
    if (!validateRequired(formData.address)) {
      newErrors.address = 'Address is required'
    }
    if (!validateRequired(formData.courseEnquiry)) {
      newErrors.courseEnquiry = 'Course Enquiry is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await submitTrainingSessionApplication(formData)
      navigate('/success', { 
        state: { 
          formType: 'Course Enquiry / Registration Application',
          title: 'Course Enquiry / Registration Submitted Successfully!'
        } 
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(`An error occurred: ${error.message || 'Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Main Categories View
  if (view === 'categories') {
    return (
      <div className="container-custom py-6 md:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3" style={{ color: '#1F2937' }}>
              Course Enquiry / Registration
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Select a category to get started
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 px-4 md:px-0">
            {mainCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="category-card group relative rounded-xl md:rounded-2xl p-6 md:p-8 shadow-md border-2 border-gray-200 hover:border-[#409891] transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div 
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(2px)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/50 transition-all duration-300" />
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="category-icon">
                    {category.icon}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white drop-shadow-lg group-hover:text-[#48ADB7] transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)'
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Sub-Categories View
  if (view === 'subcategories') {
    const currentSubCategories = subCategories[selectedCategory] || []
    const selectedMainCategory = mainCategories.find(c => c.id === selectedCategory)

    return (
      <div className="container-custom py-6 md:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBackToCategories}
            className="mb-6 flex items-center text-[#409891] hover:text-[#48ADB7] transition-colors duration-200 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </button>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#409891' }}>
              {selectedMainCategory?.title}
            </h2>
            <p className="text-lg text-gray-600">
              Select a sub-category to continue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSubCategories.map((subCategory, index) => (
              <button
                key={subCategory.id}
                onClick={() => handleSubCategoryClick(subCategory.id)}
                className="subcategory-card bg-white rounded-xl p-6 shadow-md border-2 border-gray-200 hover:border-[#409891] transition-all duration-300 hover:shadow-lg hover:scale-105 text-left"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <h3 className="text-lg font-semibold text-gray-800 hover:text-[#409891] transition-colors duration-300">
                  {subCategory.label}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Application Form View
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={handleBackToSubCategories}
          className="mb-6 flex items-center text-[#409891] hover:text-[#48ADB7] transition-colors duration-200 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sub-Categories
        </button>

        <div className="card-zoho p-8">
          <div className="mb-8 pb-6 border-b" style={{ borderColor: 'rgba(64, 152, 145, 0.2)' }}>
            <h1 className="text-2xl font-semibold mb-2" style={{ color: '#1F2937' }}>
              Course Enquiry / Registration Form
            </h1>
            <p className="text-sm text-gray-600">
              <span className="font-medium" style={{ color: '#409891' }}>Category:</span> {formData.category}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium" style={{ color: '#409891' }}>Sub-Category:</span> {formData.subCategory}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              required
              disabled
            />

            <FormInput
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              placeholder="Enter your full name"
            />

            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              placeholder="example@email.com"
            />

            <FormInput
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
              required
              placeholder="Enter your phone number"
            />

            {/* D.O.B and Age side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Date of Birth (D.O.B)"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                required
                placeholder="Select date of birth"
              />
              <FormInput
                label="Age"
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                error={errors.age}
                required
                placeholder="Auto-calculated"
                disabled
                className="bg-gray-50"
              />
            </div>

            <FormTextarea
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              required
              placeholder="Enter your address"
              rows={3}
            />

            <FormTextarea
              label="Course Enquiry"
              name="courseEnquiry"
              value={formData.courseEnquiry}
              onChange={handleChange}
              error={errors.courseEnquiry}
              required
              placeholder="Please provide details about the course you are enquiring about"
              rows={4}
            />

            <FormTextarea
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              error={errors.remarks}
              placeholder="Any additional remarks (optional)"
              rows={3}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t" style={{ borderColor: 'rgba(64, 152, 145, 0.2)' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 transition-colors duration-150"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TrainingSessionPage
