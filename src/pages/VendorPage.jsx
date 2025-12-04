import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
import FileUpload from '../components/FileUpload'
import { validateEmail, validatePhone, validateRequired, getTodayDate } from '../utils/validation'
import { submitVendorApplication } from '../utils/formSubmission'

const VendorPage = () => {
  const navigate = useNavigate()
  const [view, setView] = useState('subcategories') // 'subcategories', 'form'
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    category: '',
    vendorName: '',
    companyName: '',
    companyAddress: '',
    email: '',
    phoneNumber: '',
    appointmentStatus: '',
    businessType: '',
    uploadFile: null,
    remarks: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const businessTypeOptions = [
    { value: 'supplier', label: 'Supplier' },
    { value: 'distributor', label: 'Distributor' },
    { value: 'service-provider', label: 'Service Provider' },
    { value: 'manufacturer', label: 'Manufacturer' },
    { value: 'others', label: 'Others' }
  ]

  const appointmentStatusOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]

  const vendorSubCategories = [
    { 
      id: 'product-vendors', 
      label: 'Product Vendors',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="productGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FF8E53" />
            </linearGradient>
          </defs>
          <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke="url(#productGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#productGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'service-vendors', 
      label: 'Service Vendors',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ECDC4" />
              <stop offset="100%" stopColor="#44A08D" />
            </linearGradient>
          </defs>
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="url(#serviceGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#serviceGradient)" fillOpacity="0.1"/>
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="url(#serviceGradient)" strokeWidth="2" fill="url(#serviceGradient)" fillOpacity="0.2"/>
        </svg>
      )
    },
    { 
      id: 'software-vendors', 
      label: 'Software Vendors',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="softwareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667EEA" />
              <stop offset="100%" stopColor="#764BA2" />
            </linearGradient>
          </defs>
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="url(#softwareGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#softwareGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'raw-material-suppliers', 
      label: 'Raw Material Suppliers',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="materialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F093FB" />
              <stop offset="100%" stopColor="#F5576C" />
            </linearGradient>
          </defs>
          <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke="url(#materialGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#materialGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'printing-vendors', 
      label: 'Printing Vendors',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&h=1200&fit=crop&q=90&auto=format',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="printingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FA709A" />
              <stop offset="100%" stopColor="#FEE140" />
            </linearGradient>
          </defs>
          <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" stroke="url(#printingGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#printingGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'hardware-suppliers', 
      label: 'Hardware Suppliers',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="hardwareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#30CFD0" />
              <stop offset="100%" stopColor="#330867" />
            </linearGradient>
          </defs>
          <rect x="2" y="7" width="20" height="14" rx="2" stroke="url(#hardwareGradient)" strokeWidth="2" fill="url(#hardwareGradient)" fillOpacity="0.1"/>
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke="url(#hardwareGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="2" fill="url(#hardwareGradient)" fillOpacity="0.4"/>
        </svg>
      )
    },
    { 
      id: 'outsourcing-service-providers', 
      label: 'Outsourcing Service Providers',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="outsourcingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8EDEA" />
              <stop offset="100%" stopColor="#FED6E3" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="3" stroke="url(#outsourcingGradient)" strokeWidth="2" fill="url(#outsourcingGradient)" fillOpacity="0.3"/>
          <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" stroke="url(#outsourcingGradient)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="3" r="1" fill="url(#outsourcingGradient)" fillOpacity="0.6"/>
          <circle cx="12" cy="21" r="1" fill="url(#outsourcingGradient)" fillOpacity="0.6"/>
          <circle cx="3" cy="12" r="1" fill="url(#outsourcingGradient)" fillOpacity="0.6"/>
          <circle cx="21" cy="12" r="1" fill="url(#outsourcingGradient)" fillOpacity="0.6"/>
        </svg>
      )
    },
    { 
      id: 'labour-work-persons', 
      label: 'Labour Work Persons',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="labourGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9A9E" />
              <stop offset="100%" stopColor="#FECFEF" />
            </linearGradient>
          </defs>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="url(#labourGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#labourGradient)" fillOpacity="0.1"/>
          <circle cx="9" cy="7" r="4" stroke="url(#labourGradient)" strokeWidth="2" fill="url(#labourGradient)" fillOpacity="0.2"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="url(#labourGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'b2b-vendors', 
      label: 'B2B Vendors',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="b2bGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFECD2" />
              <stop offset="100%" stopColor="#FCB69F" />
            </linearGradient>
          </defs>
          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" stroke="url(#b2bGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#b2bGradient)" fillOpacity="0.1"/>
        </svg>
      )
    }
  ]

  const handleSubCategoryClick = (subCategoryId) => {
    const subCategory = vendorSubCategories.find(sc => sc.id === subCategoryId)
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
    if (!validateRequired(formData.vendorName)) {
      newErrors.vendorName = 'Vendor Name is required'
    }
    if (!validateRequired(formData.companyName)) {
      newErrors.companyName = 'Company Name is required'
    }
    if (!validateRequired(formData.companyAddress)) {
      newErrors.companyAddress = 'Company Address is required'
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
    if (!validateRequired(formData.appointmentStatus)) {
      newErrors.appointmentStatus = 'Appointment Status is required'
    }
    if (!validateRequired(formData.businessType)) {
      newErrors.businessType = 'Business Type is required'
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
      await submitVendorApplication(formData)
      
      navigate('/success', { 
        state: { 
          formType: 'Vendors / Suppliers Application',
          title: 'Vendors / Suppliers Application Submitted Successfully!'
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
              Vendors / Suppliers
            </h1>
            <p className="text-lg text-gray-600">
              Select a sub-category to continue with your application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorSubCategories.map((subCategory, index) => (
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
                    background: subCategory.id === 'printing-vendors' 
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
              Vendors / Suppliers Application Form
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              Please fill in all required fields to submit your vendors / suppliers application.
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
              label="Vendor Name"
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              error={errors.vendorName}
              required
              placeholder="Enter vendor name"
            />

            <FormInput
              label="Company Name"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              error={errors.companyName}
              required
              placeholder="Enter company name"
            />

            <FormTextarea
              label="Company Address"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              error={errors.companyAddress}
              required
              placeholder="Enter company address"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormSelect
                  label="Appointment Status"
                  name="appointmentStatus"
                  value={formData.appointmentStatus}
                  onChange={handleChange}
                  options={appointmentStatusOptions}
                  error={errors.appointmentStatus}
                  required
                />
              </div>
              <div>
                <FormSelect
                  label="Business Type"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  options={businessTypeOptions}
                  error={errors.businessType}
                  required
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

export default VendorPage
