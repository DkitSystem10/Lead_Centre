import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
import { validateEmail, validatePhone, validateRequired, getTodayDate } from '../utils/validation'
import { submitCareerGuidanceApplication } from '../utils/formSubmission'

const CareerGuidancePage = () => {
  const navigate = useNavigate()
  const [view, setView] = useState('subcategories') // 'subcategories', 'form'
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    category: '',
    studentName: '',
    standardYear: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    location: '',
    contactNumber: '',
    email: '',
    parentGuardianName: '',
    studiesPreference: '',
    abroadLocal: '',
    preferredCountry: '',
    cityIfAbroad: '',
    preferredUniversity: '',
    careerInterest: '',
    skillsStrengths: '',
    academicPerformance: '',
    hobbiesExtracurricular: '',
    preferredModeOfStudy: '',
    careerSupportDuration: '',
    mentorshipRequired: '',
    remarksNotes: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const standardYearOptions = [
    { value: '9th', label: '9th Standard' },
    { value: '10th', label: '10th Standard' },
    { value: '11th', label: '11th Standard' },
    { value: '12th', label: '12th Standard' },
    { value: '1st-year', label: '1st Year' },
    { value: '2nd-year', label: '2nd Year' },
    { value: '3rd-year', label: '3rd Year' },
    { value: '4th-year', label: '4th Year' },
    { value: 'graduate', label: 'Graduate' }
  ]

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ]

  const studiesPreferenceOptions = [
    { value: 'science', label: 'Science' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'arts', label: 'Arts' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medical', label: 'Medical' },
    { value: 'law', label: 'Law' },
    { value: 'business', label: 'Business' },
    { value: 'others', label: 'Others' }
  ]

  const abroadLocalOptions = [
    { value: 'local', label: 'Local' },
    { value: 'abroad', label: 'Abroad' }
  ]

  const preferredModeOfStudyOptions = [
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'hybrid', label: 'Hybrid' }
  ]

  const careerSupportDurationOptions = [
    { value: '1-year', label: '1 Year' },
    { value: '2-years', label: '2 Years' },
    { value: '5-years', label: '5 Years' },
    { value: '15-years', label: '15 Years' }
  ]

  const mentorshipRequiredOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]

  const careerGuidanceSubCategories = [
    { 
      id: 'student-career-counselling', 
      label: 'Student Career Counselling',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="counsellingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FF8E53" />
            </linearGradient>
          </defs>
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="url(#counsellingGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#counsellingGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'suitability-test', 
      label: 'Suitability test',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="testGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667EEA" />
              <stop offset="100%" stopColor="#764BA2" />
            </linearGradient>
          </defs>
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="url(#testGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#testGradient)" fillOpacity="0.1"/>
        </svg>
      )
    },
    { 
      id: 'study-abroad-guidance', 
      label: 'Study Abroad Guidance',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="abroadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ECDC4" />
              <stop offset="100%" stopColor="#44A08D" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" stroke="url(#abroadGradient)" strokeWidth="2" fill="url(#abroadGradient)" fillOpacity="0.1"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="url(#abroadGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: '15-years-career-roadmap', 
      label: '15 Years Career Roadmap',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FA709A" />
              <stop offset="100%" stopColor="#FEE140" />
            </linearGradient>
          </defs>
          <path d="M3 3v18h18M7 16l4-4 4 4 6-6" stroke="url(#roadmapGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#roadmapGradient)" fillOpacity="0.1"/>
          <circle cx="7" cy="7" r="2" fill="url(#roadmapGradient)" fillOpacity="0.4"/>
          <circle cx="17" cy="17" r="2" fill="url(#roadmapGradient)" fillOpacity="0.4"/>
        </svg>
      )
    }
  ]

  const handleSubCategoryClick = (subCategoryId) => {
    const subCategory = careerGuidanceSubCategories.find(sc => sc.id === subCategoryId)
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

  const handleCategorySelect = (categoryValue) => {
    setFormData(prev => ({
      ...prev,
      category: categoryValue
    }))
    // Clear error for category
    if (errors.category) {
      setErrors(prev => ({
        ...prev,
        category: ''
      }))
    }
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
      
      // Auto-calculate age when dateOfBirth changes
      if (name === 'dateOfBirth') {
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
    if (name === 'dateOfBirth' && errors.age) {
      setErrors(prev => ({
        ...prev,
        age: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!validateRequired(formData.category)) {
      newErrors.category = 'Category selection is required'
    }
    if (!validateRequired(formData.studentName)) {
      newErrors.studentName = 'Student Name is required'
    }
    if (!validateRequired(formData.standardYear)) {
      newErrors.standardYear = 'Standard / Year is required'
    }
    if (!validateRequired(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Date of Birth is required'
    }
    if (!validateRequired(formData.age)) {
      newErrors.age = 'Age is required'
    } else if (isNaN(formData.age) || parseInt(formData.age) < 1 || parseInt(formData.age) > 100) {
      newErrors.age = 'Please enter a valid age'
    }
    if (!validateRequired(formData.gender)) {
      newErrors.gender = 'Gender is required'
    }
    if (!validateRequired(formData.location)) {
      newErrors.location = 'Location is required'
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
    if (!validateRequired(formData.parentGuardianName)) {
      newErrors.parentGuardianName = 'Parent / Guardian Name is required'
    }
    if (!validateRequired(formData.studiesPreference)) {
      newErrors.studiesPreference = 'Studies Preference is required'
    }
    if (!validateRequired(formData.abroadLocal)) {
      newErrors.abroadLocal = 'Abroad / Local is required'
    }
    if (formData.abroadLocal === 'abroad') {
      if (!validateRequired(formData.cityIfAbroad)) {
        newErrors.cityIfAbroad = 'City (If Abroad) is required'
      }
    }
    if (!validateRequired(formData.preferredModeOfStudy)) {
      newErrors.preferredModeOfStudy = 'Preferred Mode of Study is required'
    }
    if (!validateRequired(formData.careerSupportDuration)) {
      newErrors.careerSupportDuration = 'Career Support Duration is required'
    }
    if (!validateRequired(formData.mentorshipRequired)) {
      newErrors.mentorshipRequired = 'Mentorship Required is required'
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
      await submitCareerGuidanceApplication(formData)
      navigate('/success', { 
        state: { 
          formType: 'Career Guidance Application',
          title: 'Career Guidance Application Submitted Successfully!'
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
              Career Guidance
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Select a sub-category to continue with your application
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
            {careerGuidanceSubCategories.map((subCategory, index) => (
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
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/50 transition-all duration-300" />
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
              Career Guidance Application Form
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              Please fill in all required fields to submit your career guidance application.
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
              label="Student Name"
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              error={errors.studentName}
              required
              placeholder="Enter student name"
            />

            <FormSelect
              label="Standard / Year"
              name="standardYear"
              value={formData.standardYear}
              onChange={handleChange}
              options={standardYearOptions}
              error={errors.standardYear}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                required
              />
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
              max="100"
                readOnly
            />
            </div>

            <FormSelect
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={genderOptions}
              error={errors.gender}
              required
            />

            <FormInput
              label="Location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              required
              placeholder="Enter location"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <FormInput
              label="Parent / Guardian Name"
              type="text"
              name="parentGuardianName"
              value={formData.parentGuardianName}
              onChange={handleChange}
              error={errors.parentGuardianName}
              required
              placeholder="Enter parent or guardian name"
            />

            <FormSelect
              label="Studies Preference"
              name="studiesPreference"
              value={formData.studiesPreference}
              onChange={handleChange}
              options={studiesPreferenceOptions}
              error={errors.studiesPreference}
              required
            />

            <FormSelect
              label="Abroad / Local"
              name="abroadLocal"
              value={formData.abroadLocal}
              onChange={handleChange}
              options={abroadLocalOptions}
              error={errors.abroadLocal}
              required
            />

            <FormInput
              label="Preferred Country"
              type="text"
              name="preferredCountry"
              value={formData.preferredCountry}
              onChange={handleChange}
              error={errors.preferredCountry}
              placeholder="Enter preferred country (optional)"
            />

            {formData.abroadLocal === 'abroad' && (
              <FormInput
                label="City (If Abroad)"
                type="text"
                name="cityIfAbroad"
                value={formData.cityIfAbroad}
                onChange={handleChange}
                error={errors.cityIfAbroad}
                required={formData.abroadLocal === 'abroad'}
                placeholder="Enter city name"
              />
            )}

            <FormInput
              label="Preferred University"
              type="text"
              name="preferredUniversity"
              value={formData.preferredUniversity}
              onChange={handleChange}
              error={errors.preferredUniversity}
              placeholder="Enter preferred university (optional)"
            />

            <FormInput
              label="Career Interest"
              type="text"
              name="careerInterest"
              value={formData.careerInterest}
              onChange={handleChange}
              error={errors.careerInterest}
              placeholder="Enter career interest (optional)"
            />

            <FormTextarea
              label="Skills / Strengths"
              name="skillsStrengths"
              value={formData.skillsStrengths}
              onChange={handleChange}
              error={errors.skillsStrengths}
              placeholder="Describe your skills and strengths (optional)"
              rows={3}
            />

            <FormInput
              label="Academic Performance"
              type="text"
              name="academicPerformance"
              value={formData.academicPerformance}
              onChange={handleChange}
              error={errors.academicPerformance}
              placeholder="Enter academic performance details (optional)"
            />

            <FormTextarea
              label="Hobbies / Extracurricular"
              name="hobbiesExtracurricular"
              value={formData.hobbiesExtracurricular}
              onChange={handleChange}
              error={errors.hobbiesExtracurricular}
              placeholder="Describe hobbies and extracurricular activities (optional)"
              rows={3}
            />

            <FormSelect
              label="Preferred Mode of Study"
              name="preferredModeOfStudy"
              value={formData.preferredModeOfStudy}
              onChange={handleChange}
              options={preferredModeOfStudyOptions}
              error={errors.preferredModeOfStudy}
              required
            />

            <FormSelect
              label="Career Support Duration"
              name="careerSupportDuration"
              value={formData.careerSupportDuration}
              onChange={handleChange}
              options={careerSupportDurationOptions}
              error={errors.careerSupportDuration}
              required
            />

            <FormSelect
              label="Mentorship Required"
              name="mentorshipRequired"
              value={formData.mentorshipRequired}
              onChange={handleChange}
              options={mentorshipRequiredOptions}
              error={errors.mentorshipRequired}
              required
            />

            <FormTextarea
              label="Remarks / Notes"
              name="remarksNotes"
              value={formData.remarksNotes}
              onChange={handleChange}
              error={errors.remarksNotes}
              placeholder="Any additional remarks or notes (optional)"
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

export default CareerGuidancePage