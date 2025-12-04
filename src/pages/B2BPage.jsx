import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
import FileUpload from '../components/FileUpload'
import { validateEmail, validateRequired, getTodayDate } from '../utils/validation'
import { submitB2BApplication } from '../utils/formSubmission'

const B2BPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    contactPersonName: '',
    organizationName: '',
    organizationAddress: '',
    businessType: '',
    modeOfBusiness: '',
    companyWebsiteEmail: '',
    uploadFile: null,
    remarks: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const businessTypeOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'services', label: 'Services' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'others', label: 'Others' }
  ]

  const modeOfBusinessOptions = [
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'co-worker', label: 'Co-Worker' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'others', label: 'Others' }
  ]

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

    if (!validateRequired(formData.contactPersonName)) {
      newErrors.contactPersonName = 'Contact Person Name is required'
    }
    if (!validateRequired(formData.organizationName)) {
      newErrors.organizationName = 'Organization Name is required'
    }
    if (!validateRequired(formData.organizationAddress)) {
      newErrors.organizationAddress = 'Organization Address is required'
    }
    if (!validateRequired(formData.businessType)) {
      newErrors.businessType = 'Business Type is required'
    }
    if (!validateRequired(formData.modeOfBusiness)) {
      newErrors.modeOfBusiness = 'Mode of Business is required'
    }
    if (!validateRequired(formData.companyWebsiteEmail)) {
      newErrors.companyWebsiteEmail = 'Company Website / Email is required'
    } else if (!formData.companyWebsiteEmail.includes('@') && !formData.companyWebsiteEmail.includes('.')) {
      // Basic validation for email or website
      if (!validateEmail(formData.companyWebsiteEmail) && !formData.companyWebsiteEmail.startsWith('http')) {
        newErrors.companyWebsiteEmail = 'Please enter a valid email or website URL'
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
      await submitB2BApplication(formData)
      navigate('/success', { 
        state: { 
          formType: 'B2B Application',
          title: 'B2B Application Submitted Successfully!'
        } 
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(`An error occurred: ${error.message || 'Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <div className="card-zoho p-8">
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">B2B Application Form</h1>
            <p className="text-sm text-gray-600">Please fill in all required fields to submit your B2B application.</p>
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
              <div>
                <FormSelect
                  label="Mode of Business"
                  name="modeOfBusiness"
                  value={formData.modeOfBusiness}
                  onChange={handleChange}
                  options={modeOfBusinessOptions}
                  error={errors.modeOfBusiness}
                  required
                />
              </div>
            </div>

            <FormInput
              label="Company Website / Email"
              type="text"
              name="companyWebsiteEmail"
              value={formData.companyWebsiteEmail}
              onChange={handleChange}
              error={errors.companyWebsiteEmail}
              required
              placeholder="Enter website URL or email"
            />

            <FileUpload
              label="Upload (Brochure / Visiting Card)"
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

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
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

export default B2BPage