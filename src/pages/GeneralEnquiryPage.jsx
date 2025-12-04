import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
import FileUpload from '../components/FileUpload'
import { validateEmail, validatePhone, validateRequired, getTodayDate } from '../utils/validation'
import { submitVendorApplication, submitJobSeekerApplication, submitPartnersApplication, submitStudentInternshipApplication, submitTrainingSessionApplication } from '../utils/formSubmission'

const GeneralEnquiryPage = () => {
  const navigate = useNavigate()
  const [view, setView] = useState('categories') // 'categories', 'subcategories', 'form'
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    category: '',
    subCategory: '',
    // Vendor fields
    vendorName: '',
    companyName: '',
    companyAddress: '',
    email: '',
    phoneNumber: '',
    appointmentStatus: '',
    businessType: '',
    uploadFile: null,
    remarks: '',
    // Job Seeker fields
    fullName: '',
    gender: '',
    dob: '',
    age: '',
    address: '',
    bloodGroup: '',
    contactNumber: '',
    qualification: '',
    department: '',
    yearsOfExperience: '',
    preferredJobType: '',
    uploadResume: null,
    // Partners fields
    contactPersonName: '',
    organizationName: '',
    organizationAddress: '',
    businessType: '',
    modeOfBusiness: '',
    companyWebsiteEmail: '',
    // Internship fields
    studentName: '',
    registrationNumber: '',
    collegeName: '',
    courseType: '',
    department: '',
    internshipDomain: '',
    duration: '',
    // Course Enquiry fields
    trainerName: '',
    topic: '',
    studentRegNo: '',
    participantName: '',
    assessment: {},
    feedback: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Main Categories
  const mainCategories = [
    {
      id: 'vendors-suppliers',
      title: 'Vendors / Suppliers',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      id: 'job-seekers',
      title: 'Job Seekers',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'partners',
      title: 'Partners',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'internship-applicants',
      title: 'Internship Applicants',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'course-enquiries',
      title: 'Course Enquiries / Registration',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ]

  // Sub-Categories by Main Category
  const subCategories = {
    'vendors-suppliers': [
      { id: 'product-suppliers', label: 'Product Suppliers' },
      { id: 'service-providers', label: 'Service Providers' },
      { id: 'equipment-vendors', label: 'Equipment Vendors' },
      { id: 'technology-vendors', label: 'Technology Vendors' }
    ],
    'job-seekers': [
      { id: 'full-time-positions', label: 'Full-Time Positions' },
      { id: 'part-time-positions', label: 'Part-Time Positions' },
      { id: 'freelance-contract', label: 'Freelance / Contract Roles' }
    ],
    'partners': [
      { id: 'schools-colleges', label: 'Schools / Colleges' },
      { id: 'corporate-companies', label: 'Corporate Companies' },
      { id: 'franchise-enquiries', label: 'Franchise Enquiries' },
      { id: 'media-press', label: 'Media / Press Contacts' },
      { id: 'investors-csr', label: 'Investors / CSR' }
    ],
    'internship-applicants': [
      { id: 'technical-internships', label: 'Technical Internships' },
      { id: 'business-management', label: 'Business / Management Internships' },
      { id: 'creative-content', label: 'Creative / Content Internships' }
    ],
    'course-enquiries': [
      { id: 'ai-robotics', label: 'School of AI & Robotics' },
      { id: 'languages', label: 'School of Languages' },
      { id: 'finance', label: 'School of Finance' },
      { id: 'business', label: 'School of Business' }
    ]
  }

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ]

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (file) => {
    if (selectedCategory === 'vendors-suppliers') {
      setFormData(prev => ({ ...prev, uploadFile: file }))
    } else if (selectedCategory === 'job-seekers') {
      setFormData(prev => ({ ...prev, uploadResume: file }))
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

    // Category-specific validation
    if (selectedCategory === 'vendors-suppliers') {
      if (!validateRequired(formData.vendorName)) newErrors.vendorName = 'Vendor Name is required'
      if (!validateRequired(formData.companyName)) newErrors.companyName = 'Company Name is required'
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
    } else if (selectedCategory === 'job-seekers') {
      if (!validateRequired(formData.fullName)) newErrors.fullName = 'Full Name is required'
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
    } else if (selectedCategory === 'partners') {
      if (!validateRequired(formData.contactPersonName)) newErrors.contactPersonName = 'Contact Person Name is required'
      if (!validateRequired(formData.organizationName)) newErrors.organizationName = 'Organization Name is required'
      if (!validateRequired(formData.email)) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    } else if (selectedCategory === 'internship-applicants') {
      if (!validateRequired(formData.studentName)) newErrors.studentName = 'Student Name is required'
      if (!validateRequired(formData.registrationNumber)) newErrors.registrationNumber = 'Registration Number is required'
      if (!validateRequired(formData.email)) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    } else if (selectedCategory === 'course-enquiries') {
      if (!validateRequired(formData.participantName)) newErrors.participantName = 'Participant Name is required'
      if (!validateRequired(formData.email)) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
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
      let submissionData = {}
      let formType = ''
      let title = ''

      if (selectedCategory === 'vendors-suppliers') {
        submissionData = {
          date: formData.date,
          category: formData.subCategory,
          vendorName: formData.vendorName,
          companyName: formData.companyName,
          companyAddress: formData.companyAddress,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          appointmentStatus: formData.appointmentStatus,
          businessType: formData.businessType,
          uploadFile: formData.uploadFile,
          remarks: formData.remarks
        }
        await submitVendorApplication(submissionData)
        formType = 'Vendors / Suppliers Application'
        title = 'Vendors / Suppliers Application Submitted Successfully!'
      } else if (selectedCategory === 'job-seekers') {
        submissionData = {
          date: formData.date,
          category: formData.subCategory,
          fullName: formData.fullName,
          gender: formData.gender,
          dob: formData.dob,
          age: formData.age,
          address: formData.address,
          bloodGroup: formData.bloodGroup,
          contactNumber: formData.contactNumber,
          email: formData.email,
          qualification: formData.qualification,
          department: formData.department,
          yearsOfExperience: formData.yearsOfExperience,
          preferredJobType: formData.subCategory,
          uploadResume: formData.uploadResume,
          remarks: formData.remarks
        }
        await submitJobSeekerApplication(submissionData)
        formType = 'Job Seekers Application'
        title = 'Job Seekers Application Submitted Successfully!'
      } else if (selectedCategory === 'partners') {
        submissionData = {
          date: formData.date,
          category: formData.subCategory,
          contactPersonName: formData.contactPersonName,
          organizationName: formData.organizationName,
          organizationAddress: formData.organizationAddress,
          businessType: formData.businessType,
          modeOfBusiness: formData.modeOfBusiness,
          companyWebsiteEmail: formData.email,
          uploadFile: formData.uploadFile,
          remarks: formData.remarks
        }
        await submitPartnersApplication(submissionData)
        formType = 'Partners Application'
        title = 'Partners Application Submitted Successfully!'
      } else if (selectedCategory === 'internship-applicants') {
        submissionData = {
          date: formData.date,
          category: formData.subCategory,
          studentName: formData.studentName,
          registrationNumber: formData.registrationNumber,
          collegeName: formData.collegeName,
          courseType: formData.courseType,
          department: formData.department,
          internshipDomain: formData.internshipDomain,
          duration: formData.duration,
          email: formData.email,
          uploadFile: formData.uploadFile,
          remarks: formData.remarks
        }
        await submitStudentInternshipApplication(submissionData)
        formType = 'Internship Applicants Application'
        title = 'Internship Applicants Application Submitted Successfully!'
      } else if (selectedCategory === 'course-enquiries') {
        submissionData = {
          date: formData.date,
          category: formData.category,
          subCategory: formData.subCategory,
          trainerName: formData.trainerName,
          topic: formData.topic,
          studentRegNo: formData.studentRegNo,
          participantName: formData.participantName,
          gender: formData.gender,
          email: formData.email,
          address: formData.address,
          assessment: formData.assessment,
          feedback: formData.feedback,
          remarks: formData.remarks
        }
        await submitTrainingSessionApplication(submissionData)
        formType = 'Course Enquiry / Registration Application'
        title = 'Course Enquiry / Registration Submitted Successfully!'
      }

      navigate('/success', { 
        state: { 
          formType,
          title
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
      <div className="container-custom py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3" style={{ color: '#1F2937' }}>
              General Enquiry
            </h1>
            <p className="text-lg text-gray-600">
              Select a category to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="category-card group relative bg-white rounded-2xl p-8 shadow-md border-2 border-gray-200 hover:border-[#409891] transition-all duration-300 hover:shadow-xl hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="category-icon">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#409891] transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
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
      <div className="container-custom py-12">
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

  // Application Form View - Render different forms based on category
  const renderFormFields = () => {
    if (selectedCategory === 'vendors-suppliers') {
      return (
        <>
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
            placeholder="Enter company address"
            rows={3}
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
            placeholder="Enter phone number"
          />
          <FormSelect
            label="Appointment Status"
            name="appointmentStatus"
            value={formData.appointmentStatus}
            onChange={handleChange}
            options={appointmentStatusOptions}
            error={errors.appointmentStatus}
          />
          <FormSelect
            label="Business Type"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            options={businessTypeOptions}
            error={errors.businessType}
          />
          <FileUpload
            label="Upload File"
            onFileChange={handleFileChange}
            error={errors.uploadFile}
          />
        </>
      )
    } else if (selectedCategory === 'job-seekers') {
      return (
        <>
          <FormInput
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
            placeholder="Enter full name"
          />
          <FormSelect
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={genderOptions}
            error={errors.gender}
          />
          <FormInput
            label="Date of Birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
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
            label="Contact Number"
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            error={errors.contactNumber}
            required
            placeholder="Enter contact number"
          />
          <FormTextarea
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            placeholder="Enter address"
            rows={3}
          />
          <FormInput
            label="Qualification"
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            error={errors.qualification}
            placeholder="Enter qualification"
          />
          <FormInput
            label="Department"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            error={errors.department}
            placeholder="Enter department"
          />
          <FormInput
            label="Years of Experience"
            type="text"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            error={errors.yearsOfExperience}
            placeholder="Enter years of experience"
          />
          <FileUpload
            label="Upload Resume"
            onFileChange={handleFileChange}
            error={errors.uploadResume}
          />
        </>
      )
    } else if (selectedCategory === 'partners') {
      return (
        <>
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
            placeholder="Enter organization address"
            rows={3}
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
          <FormSelect
            label="Business Type"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            options={businessTypeOptions}
            error={errors.businessType}
          />
          <FormInput
            label="Mode of Business"
            type="text"
            name="modeOfBusiness"
            value={formData.modeOfBusiness}
            onChange={handleChange}
            error={errors.modeOfBusiness}
            placeholder="Enter mode of business"
          />
          <FileUpload
            label="Upload File"
            onFileChange={handleFileChange}
            error={errors.uploadFile}
          />
        </>
      )
    } else if (selectedCategory === 'internship-applicants') {
      return (
        <>
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
          <FormInput
            label="College Name"
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            error={errors.collegeName}
            placeholder="Enter college name"
          />
          <FormInput
            label="Course Type"
            type="text"
            name="courseType"
            value={formData.courseType}
            onChange={handleChange}
            error={errors.courseType}
            placeholder="Enter course type"
          />
          <FormInput
            label="Department"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            error={errors.department}
            placeholder="Enter department"
          />
          <FormInput
            label="Internship Domain"
            type="text"
            name="internshipDomain"
            value={formData.internshipDomain}
            onChange={handleChange}
            error={errors.internshipDomain}
            placeholder="Enter internship domain"
          />
          <FormInput
            label="Duration"
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            error={errors.duration}
            placeholder="Enter duration"
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
          <FileUpload
            label="Upload File"
            onFileChange={handleFileChange}
            error={errors.uploadFile}
          />
        </>
      )
    } else if (selectedCategory === 'course-enquiries') {
      return (
        <>
          <FormInput
            label="Trainer Name"
            type="text"
            name="trainerName"
            value={formData.trainerName}
            onChange={handleChange}
            error={errors.trainerName}
            placeholder="Enter trainer name"
          />
          <FormInput
            label="Topic"
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            error={errors.topic}
            placeholder="Enter training topic"
          />
          <FormInput
            label="Student Registration Number"
            type="text"
            name="studentRegNo"
            value={formData.studentRegNo}
            onChange={handleChange}
            error={errors.studentRegNo}
            placeholder="Enter student registration number"
          />
          <FormInput
            label="Participant Name"
            type="text"
            name="participantName"
            value={formData.participantName}
            onChange={handleChange}
            error={errors.participantName}
            required
            placeholder="Enter participant name"
          />
          <FormSelect
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={genderOptions}
            error={errors.gender}
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
          <FormTextarea
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            placeholder="Enter address"
            rows={3}
          />
          <FormTextarea
            label="Feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            error={errors.feedback}
            placeholder="Your feedback about the course"
            rows={4}
          />
        </>
      )
    }
    return null
  }

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
              General Enquiry Application Form
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

            {renderFormFields()}

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

export default GeneralEnquiryPage

