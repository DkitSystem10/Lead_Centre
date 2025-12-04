import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
import FileUpload from '../components/FileUpload'
import { validateEmail, validatePhone, validateRequired, getTodayDate } from '../utils/validation'
import { submitJobSeekerApplication } from '../utils/formSubmission'

const JobSeekerPage = () => {
  const navigate = useNavigate()
  const [view, setView] = useState('subcategories') // 'subcategories', 'form'
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    category: '',
    fullName: '',
    gender: '',
    dob: '',
    age: '',
    address: '',
    bloodGroup: '',
    contactNumber: '',
    email: '',
    qualification: '',
    department: '',
    yearsOfExperience: '',
    preferredJobType: '',
    uploadResume: null,
    remarks: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ]

  const qualificationOptions = [
    { value: '10th', label: '10th' },
    { value: '12th', label: '12th' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'ug', label: 'UG' },
    { value: 'pg', label: 'PG' },
    { value: 'phd', label: 'PhD' }
  ]

  const departmentOptions = [
    { value: 'hr', label: 'HR' },
    { value: 'it', label: 'IT' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'sales', label: 'Sales' },
    { value: 'production', label: 'Production' },
    { value: 'others', label: 'Others' }
  ]

  const experienceOptions = [
    { value: 'fresher', label: 'Fresher' },
    { value: '1-2', label: '1–2 Years' },
    { value: '3-5', label: '3–5 Years' },
    { value: '5+', label: '5+ Years' }
  ]

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'remote', label: 'Remote' }
  ]

  const jobSubCategories = [
    { 
      id: 'full-time-jobs', 
      label: 'Full-time jobs',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="fulltimeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667EEA" />
              <stop offset="100%" stopColor="#764BA2" />
            </linearGradient>
          </defs>
          <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="url(#fulltimeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#fulltimeGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'part-time-jobs', 
      label: 'Part-time jobs',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="parttimeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F093FB" />
              <stop offset="100%" stopColor="#F5576C" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" stroke="url(#parttimeGradient)" strokeWidth="2" fill="url(#parttimeGradient)" fillOpacity="0.1"/>
          <path d="M12 6v6l4 2" stroke="url(#parttimeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'freelancers', 
      label: 'Freelancers',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="freelancerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ECDC4" />
              <stop offset="100%" stopColor="#44A08D" />
            </linearGradient>
          </defs>
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="url(#freelancerGradient)" strokeWidth="2" fill="url(#freelancerGradient)" fillOpacity="0.1"/>
          <path d="M8 21h8M12 17v4" stroke="url(#freelancerGradient)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="10" r="2" fill="url(#freelancerGradient)" fillOpacity="0.3"/>
        </svg>
      )
    },
    { 
      id: 'contract-based', 
      label: 'Contract-based',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="contractGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FA709A" />
              <stop offset="100%" stopColor="#FEE140" />
            </linearGradient>
          </defs>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="url(#contractGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#contractGradient)" fillOpacity="0.1"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="url(#contractGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ]

  const handleSubCategoryClick = (subCategoryId) => {
    const subCategory = jobSubCategories.find(sc => sc.id === subCategoryId)
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

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return ''
    
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    
    if (isNaN(birthDate.getTime())) return ''
    
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age > 0 ? age.toString() : ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [name]: value
      }
      
      // Auto-calculate age when dob changes
      if (name === 'dob') {
        const calculatedAge = calculateAge(value)
        updatedData.age = calculatedAge
      }
      
      return updatedData
    })
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    // Clear age error when DOB is entered
    if (name === 'dob' && errors.age) {
      setErrors(prev => ({
        ...prev,
        age: ''
      }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      uploadResume: file
    }))
    if (errors.uploadResume) {
      setErrors(prev => ({
        ...prev,
        uploadResume: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!validateRequired(formData.category)) {
      newErrors.category = 'Category selection is required'
    }
    if (!validateRequired(formData.fullName)) {
      newErrors.fullName = 'Full Name is required'
    }
    if (!validateRequired(formData.gender)) {
      newErrors.gender = 'Gender is required'
    }
    if (!validateRequired(formData.dob)) {
      newErrors.dob = 'Date of Birth is required'
    }
    if (!validateRequired(formData.age)) {
      newErrors.age = 'Age is required'
    }
    if (!validateRequired(formData.address)) {
      newErrors.address = 'Address is required'
    }
    if (!validateRequired(formData.bloodGroup)) {
      newErrors.bloodGroup = 'Blood Group is required'
    }
    if (!validateRequired(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact Number is required'
    } else if (!validatePhone(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid phone number'
    }
    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!validateRequired(formData.qualification)) {
      newErrors.qualification = 'Qualification is required'
    }
    if (!validateRequired(formData.department)) {
      newErrors.department = 'Department is required'
    }
    if (!validateRequired(formData.yearsOfExperience)) {
      newErrors.yearsOfExperience = 'Years of Experience is required'
    }
    if (!validateRequired(formData.preferredJobType)) {
      newErrors.preferredJobType = 'Preferred Job Type is required'
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
      await submitJobSeekerApplication(formData)
      navigate('/success', { 
        state: { 
          formType: 'Job Seeker Application',
          title: 'Job Seeker Application Submitted Successfully!'
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
              Job Seekers
            </h1>
            <p className="text-lg text-gray-600">
              Select a sub-category to continue with your application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobSubCategories.map((subCategory, index) => (
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
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/50 transition-all duration-300" />
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
              Job Seekers Application Form
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              Please fill in all required fields to submit your job application.
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
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
              placeholder="Enter your full name"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormInput
                  label="D.O.B"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  error={errors.dob}
                  required
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <FormInput
                  label="Age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  error={errors.age}
                  required
                  placeholder="Auto-calculated from DOB"
                  min="1"
                  max="120"
                  readOnly
                />
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormInput
                  label="Blood Group"
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  error={errors.bloodGroup}
                  required
                  placeholder="e.g., O+, A+, B+"
                />
              </div>
              <div>
                <FormSelect
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={genderOptions}
                  error={errors.gender}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
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
              </div>
              <div>
                <FormInput
                  label="Contact Number"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  error={errors.contactNumber}
                  required
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            <FormSelect
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              options={qualificationOptions}
              error={errors.qualification}
              required
            />

            <FormSelect
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              options={departmentOptions}
              error={errors.department}
              required
            />

            <FormSelect
              label="Years of Experience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              options={experienceOptions}
              error={errors.yearsOfExperience}
              required
            />

            <FormSelect
              label="Preferred Job Type"
              name="preferredJobType"
              value={formData.preferredJobType}
              onChange={handleChange}
              options={jobTypeOptions}
              error={errors.preferredJobType}
              required
            />

            <FileUpload
              label="Upload Resume"
              name="uploadResume"
              onChange={handleFileChange}
              error={errors.uploadResume}
              accept=".pdf,.doc,.docx"
              file={formData.uploadResume}
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

export default JobSeekerPage
