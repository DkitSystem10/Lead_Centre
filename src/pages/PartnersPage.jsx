import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormTextarea from '../components/FormTextarea'
import FileUpload from '../components/FileUpload'
import { validateEmail, validatePhone, validateRequired, getTodayDate } from '../utils/validation'
import { submitPartnersApplication } from '../utils/formSubmission'

const PartnersPage = () => {
  const navigate = useNavigate()
  const [view, setView] = useState('subcategories') // 'subcategories', 'form'
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    category: '',
    contactPersonName: '',
    organizationName: '',
    organizationAddress: '',
    email: '',
    phoneNumber: '',
    uploadFile: null,
    remarks: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const partnerSubCategories = [
    { 
      id: 'schools-colleges', 
      label: 'Schools / Colleges',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=1200&fit=crop&q=90&auto=format',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="schoolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667EEA" />
              <stop offset="100%" stopColor="#764BA2" />
            </linearGradient>
          </defs>
          <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="url(#schoolGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#schoolGradient)" fillOpacity="0.2"/>
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="url(#schoolGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#schoolGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'corporate-companies', 
      label: 'Corporate Companies',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="corporateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FF8E53" />
            </linearGradient>
          </defs>
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="url(#corporateGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#corporateGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'franchise-enquiries', 
      label: 'Franchise Enquiries',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="franchiseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ECDC4" />
              <stop offset="100%" stopColor="#44A08D" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="3" stroke="url(#franchiseGradient)" strokeWidth="2" fill="url(#franchiseGradient)" fillOpacity="0.3"/>
          <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" stroke="url(#franchiseGradient)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="3" r="1.5" fill="url(#franchiseGradient)" fillOpacity="0.6"/>
          <circle cx="12" cy="21" r="1.5" fill="url(#franchiseGradient)" fillOpacity="0.6"/>
          <circle cx="3" cy="12" r="1.5" fill="url(#franchiseGradient)" fillOpacity="0.6"/>
          <circle cx="21" cy="12" r="1.5" fill="url(#franchiseGradient)" fillOpacity="0.6"/>
        </svg>
      )
    },
    { 
      id: 'media-press-contacts', 
      label: 'Media / Press Contacts',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="mediaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F093FB" />
              <stop offset="100%" stopColor="#F5576C" />
            </linearGradient>
          </defs>
          <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" stroke="url(#mediaGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#mediaGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'investors-csr', 
      label: 'Investors / CSR',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="investorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FA709A" />
              <stop offset="100%" stopColor="#FEE140" />
            </linearGradient>
          </defs>
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="url(#investorGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#investorGradient)" fillOpacity="0.1"/>
        </svg>
      )
    }
  ]

  const handleSubCategoryClick = (subCategoryId) => {
    const subCategory = partnerSubCategories.find(sc => sc.id === subCategoryId)
    setSelectedSubCategory(subCategoryId)
    setFormData(prev => ({
      ...prev,
      category: subCategory?.label || ''
    }))
    setView('form')
  }

  const handleBackToSubCategories = () => {
    setView('subcategories')
    setSelectedSubCategory('')
    setFormData(prev => ({
      ...prev,
      category: ''
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      uploadFile: file
    }))
    if (errors.uploadFile) {
      setErrors(prev => ({
        ...prev,
        uploadFile: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!validateRequired(formData.category)) {
      newErrors.category = 'Category selection is required'
    }
    if (!validateRequired(formData.contactPersonName)) {
      newErrors.contactPersonName = 'Contact Person Name is required'
    }
    if (!validateRequired(formData.organizationName)) {
      newErrors.organizationName = 'Organization Name is required'
    }
    if (!validateRequired(formData.organizationAddress)) {
      newErrors.organizationAddress = 'Organization Address is required'
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
      await submitPartnersApplication(formData)
      
      navigate('/success', { 
        state: { 
          formType: 'Partners Application',
          title: 'Partners Application Submitted Successfully!'
        } 
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(`An error occurred: ${error.message || 'Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Sub-Categories View
  if (view === 'subcategories') {
    return (
      <div className="container-custom py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3" style={{ color: '#1F2937' }}>
              Partners
            </h1>
            <p className="text-lg text-gray-600">
              Select a sub-category to continue with your application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerSubCategories.map((subCategory, index) => (
              <button
                key={subCategory.id}
                onClick={() => handleSubCategoryClick(subCategory.id)}
                className="category-card group relative rounded-2xl p-8 shadow-md border-2 border-gray-200 hover:border-[#409891] transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div 
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    backgroundImage: `url(${subCategory.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(2px)'
                  }}
                />
                <div 
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    background: subCategory.id === 'schools-colleges' 
                      ? 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25))'
                      : 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))'
                  }}
                />
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="category-icon">
                    {subCategory.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white drop-shadow-lg group-hover:text-[#48ADB7] transition-colors duration-300">
                    {subCategory.label}
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
              Partners Application Form
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              Please fill in all required fields to submit your partners application.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium" style={{ color: '#409891' }}>Selected Category:</span> {formData.category}
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
              label="Contact Person Name"
              type="text"
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleChange}
              error={errors.contactPersonName}
              required
              placeholder="Enter contact person name"
            />

            <FormInput
              label="Organization Name"
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              error={errors.organizationName}
              required
              placeholder="Enter organization name"
            />

            <FormTextarea
              label="Organization Address"
              name="organizationAddress"
              value={formData.organizationAddress}
              onChange={handleChange}
              error={errors.organizationAddress}
              required
              placeholder="Enter organization address"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormInput
                  label="Email ID"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <FormInput
                  label="Phone Number"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={errors.phoneNumber}
                  required
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <FileUpload
              label="Upload File (Company Profile / Visiting Card)"
              name="uploadFile"
              onChange={handleFileChange}
              error={errors.uploadFile}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              file={formData.uploadFile}
            />

            <FormTextarea
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              error={errors.remarks}
              placeholder="Any additional remarks (optional)"
              rows={4}
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

export default PartnersPage
