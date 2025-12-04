import { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    description: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        description: ''
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Contact Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight" style={{ 
              color: '#1a1a1a',
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '0.02em'
            }}>
              Get In <span style={{ 
                background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '600'
              }}>Touch</span>
            </h1>
            <div className="w-24 h-px mx-auto mb-10" style={{ 
              background: 'linear-gradient(to right, transparent, #409891, #48ADB7, #409891, transparent)'
            }}></div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal" style={{ 
              color: '#666',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.01em'
            }}>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Enquiry Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 lg:p-10" style={{
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)'
              }}>
                <h2 className="text-3xl font-semibold mb-6" style={{ 
                  color: '#1a1a1a',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.02em'
                }}>
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        borderColor: '#e0e0e0',
                        backgroundColor: '#fafafa'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#409891'
                        e.target.style.backgroundColor = '#ffffff'
                        e.target.style.boxShadow = '0 0 0 3px rgba(64, 152, 145, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0'
                        e.target.style.backgroundColor = '#fafafa'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        borderColor: '#e0e0e0',
                        backgroundColor: '#fafafa'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#409891'
                        e.target.style.backgroundColor = '#ffffff'
                        e.target.style.boxShadow = '0 0 0 3px rgba(64, 152, 145, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0'
                        e.target.style.backgroundColor = '#fafafa'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        borderColor: '#e0e0e0',
                        backgroundColor: '#fafafa'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#409891'
                        e.target.style.backgroundColor = '#ffffff'
                        e.target.style.boxShadow = '0 0 0 3px rgba(64, 152, 145, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0'
                        e.target.style.backgroundColor = '#fafafa'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 appearance-none bg-no-repeat bg-right pr-10"
                      style={{
                        borderColor: '#e0e0e0',
                        backgroundColor: '#fafafa',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23409891\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.5em 1.5em'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#409891'
                        e.target.style.backgroundColor = '#ffffff'
                        e.target.style.boxShadow = '0 0 0 3px rgba(64, 152, 145, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0'
                        e.target.style.backgroundColor = '#fafafa'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      <option value="">Select a category</option>
                      <option value="Vendor">Vendor</option>
                      <option value="B2B">B2B</option>
                      <option value="Jobseeker">Jobseeker</option>
                      <option value="Student-Internship">Student-Internship</option>
                      <option value="Training Section">Training Section</option>
                      <option value="Career Guidance">Career Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 resize-none"
                      style={{
                        borderColor: '#e0e0e0',
                        backgroundColor: '#fafafa'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#409891'
                        e.target.style.backgroundColor = '#ffffff'
                        e.target.style.boxShadow = '0 0 0 3px rgba(64, 152, 145, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0'
                        e.target.style.backgroundColor = '#fafafa'
                        e.target.style.boxShadow = 'none'
                      }}
                      placeholder="Please describe your enquiry..."
                    ></textarea>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg text-sm font-semibold text-white transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: isSubmitting 
                        ? 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)'
                        : 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                      boxShadow: '0 2px 8px rgba(64, 152, 145, 0.2)',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.target.style.boxShadow = '0 4px 16px rgba(64, 152, 145, 0.35)'
                        e.target.style.transform = 'translateY(-1px)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = '0 2px 8px rgba(64, 152, 145, 0.2)'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Side - Contact Info & Map */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-8 lg:p-10" style={{
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)'
              }}>
                <h2 className="text-3xl font-semibold mb-8" style={{ 
                  color: '#1a1a1a',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.02em'
                }}>
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {/* Phone Number */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{
                      background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)'
                    }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1" style={{ color: '#666' }}>Phone</h3>
                      <p className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>+91 123 456 7890</p>
                      <p className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>+91 987 654 3210</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{
                      background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)'
                    }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1" style={{ color: '#666' }}>Email</h3>
                      <p className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>info@leadcentre.com</p>
                      <p className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>support@leadcentre.com</p>
                    </div>
                  </div>

                  {/* Office Address */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{
                      background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)'
                    }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1" style={{ color: '#666' }}>Our Location</h3>
                      <p className="text-base leading-relaxed" style={{ color: '#1a1a1a' }}>
                        Durkkas Academy of Research and Education,<br />
                        58/2, MDR Nagar North, SBK College Road,<br />
                        Aruppukottai - 626101,<br />
                        Virudhunagar District, Tamilnadu
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden" style={{
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
                height: '400px'
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.5!2d78.09!3d9.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b218981d%3A0x939e4b4c8b8b8b8b!2sAruppukottai%2C%20Tamil%20Nadu%20626101!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location - Durkkas Academy of Research and Education"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

