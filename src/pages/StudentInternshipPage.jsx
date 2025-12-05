import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
import FileUpload from '../components/FileUpload'
import { validateEmail, validatePhone, validateRequired, getTodayDate } from '../utils/validation'
import { submitStudentInternshipApplication } from '../utils/formSubmission'

const StudentInternshipPage = () => {
  const navigate = useNavigate()
  const [view, setView] = useState('subcategories') // 'subcategories', 'form'
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    category: '',
    fullName: '',
    registrationNumber: '',
    address: '',
    email: '',
    contactNumber: '',
    bloodGroup: '',
    dob: '',
    age: '',
    gender: '',
    collegeInstitutionName: '',
    courseType: '',
    department: '',
    internshipDomain: '',
    duration: '',
    uploadFile: null,
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

  const courseTypeOptions = [
    { value: 'ug', label: 'UG' },
    { value: 'pg', label: 'PG' },
    { value: 'certification', label: 'Certification' }
  ]

  const departmentOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'mechanical', label: 'Mechanical' },
    { value: 'civil', label: 'Civil' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'business', label: 'Business' },
    { value: 'others', label: 'Others' }
  ]

  const internshipDomainOptions = [
    { value: 'it', label: 'IT' },
    { value: 'non-it', label: 'Non-IT' },
    { value: 'others', label: 'Others' }
  ]

  const durationOptions = [
    { value: '3-months', label: '3 Months' },
    { value: '6-months', label: '6 Months' }
  ]

  const internshipSubCategories = [
    { 
      id: 'academic-mandatory-internships', 
      label: 'Academic Mandatory internships',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="academicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667EEA" />
              <stop offset="100%" stopColor="#764BA2" />
            </linearGradient>
          </defs>
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="url(#academicGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#academicGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'college-final-year-students', 
      label: 'College final-year students',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=1200&fit=crop&q=90&auto=format',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="collegeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F093FB" />
              <stop offset="100%" stopColor="#F5576C" />
            </linearGradient>
          </defs>
          <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="url(#collegeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#collegeGradient)" fillOpacity="0.2"/>
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="url(#collegeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#collegeGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'freshers-need-training-placement', 
      label: 'Freshers need training & placement',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="fresherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ECDC4" />
              <stop offset="100%" stopColor="#44A08D" />
            </linearGradient>
          </defs>
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="url(#fresherGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#fresherGradient)" fillOpacity="0.1"/>
          <circle cx="12" cy="12" r="2" fill="url(#fresherGradient)" fillOpacity="0.3"/>
        </svg>
      )
    }
  ]

  const handleSubCategoryClick = (subCategoryId) => {
    const subCategory = internshipSubCategories.find(sc => sc.id === subCategoryId)
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
    if (!validateRequired(formData.fullName)) {
      newErrors.fullName = 'Full Name is required'
    }
    if (!validateRequired(formData.registrationNumber)) {
      newErrors.registrationNumber = 'Registration Number is required'
    }
    if (!validateRequired(formData.address)) {
      newErrors.address = 'Address is required'
    }
    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!validateRequired(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact Number is required'
    } else if (!validatePhone(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid phone number'
    }
    if (!validateRequired(formData.bloodGroup)) {
      newErrors.bloodGroup = 'Blood Group is required'
    }
    if (!validateRequired(formData.dob)) {
      newErrors.dob = 'Date of Birth is required'
    }
    if (!validateRequired(formData.age)) {
      newErrors.age = 'Age is required'
    }
    if (!validateRequired(formData.gender)) {
      newErrors.gender = 'Gender is required'
    }
    if (!validateRequired(formData.collegeInstitutionName)) {
      newErrors.collegeInstitutionName = 'College / Institution Name is required'
    }
    if (!validateRequired(formData.courseType)) {
      newErrors.courseType = 'Course Type is required'
    }
    if (!validateRequired(formData.department)) {
      newErrors.department = 'Department is required'
    }
    if (!validateRequired(formData.internshipDomain)) {
      newErrors.internshipDomain = 'Internship Domain is required'
    }
    if (!validateRequired(formData.duration)) {
      newErrors.duration = 'Duration is required'
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
      await submitStudentInternshipApplication(formData)
      navigate('/success', { 
        state: { 
          formType: 'Internship Applicants Application',
          title: 'Internship Applicants Application Submitted Successfully!'
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
      <div className="container-custom py-6 md:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3" style={{ color: '#1F2937' }}>
              Internship Applicants
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Select a sub-category to continue with your application
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
            {internshipSubCategories.map((subCategory, index) => (
              <button
                key={subCategory.id}
                onClick={() => handleSubCategoryClick(subCategory.id)}
                className="category-card group relative rounded-xl md:rounded-2xl p-6 md:p-8 shadow-md border-2 border-gray-200 hover:border-[#409891] transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden"
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
                    background: subCategory.id === 'college-final-year-students' 
                      ? 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25))'
                      : 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))'
                  }}
                />
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="category-icon">
                    {subCategory.icon}
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white drop-shadow-lg group-hover:text-[#48ADB7] transition-colors duration-300">
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
              Internship Applicants Application Form
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              Please fill in all required fields to submit your internship application.
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

            <FormInput
              label="Registration Number"
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              error={errors.registrationNumber}
              required
              placeholder="Enter registration number"
            />

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

            <FormInput
              label="College / Institution Name"
              type="text"
              name="collegeInstitutionName"
              value={formData.collegeInstitutionName}
              onChange={handleChange}
              error={errors.collegeInstitutionName}
              required
              placeholder="Enter college or institution name"
            />

            <FormSelect
              label="Course Type"
              name="courseType"
              value={formData.courseType}
              onChange={handleChange}
              options={courseTypeOptions}
              error={errors.courseType}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
            <FormSelect
              label="Internship Domain"
              name="internshipDomain"
              value={formData.internshipDomain}
              onChange={handleChange}
              options={internshipDomainOptions}
              error={errors.internshipDomain}
              required
            />
              </div>
              <div>
            <FormSelect
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              options={durationOptions}
              error={errors.duration}
              required
            />
              </div>
            </div>

            <FileUpload
              label="Upload File (Resume / ID / Letter)"
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

export default StudentInternshipPage