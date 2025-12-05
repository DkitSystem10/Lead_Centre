import { useEffect, useRef } from 'react'
import Card from '../components/Card'
import jobSeekerImage from '../assets/Job_Seeker.png'
import careerGuidanceImage from '../assets/Career_Guidance.png'
import studentInternshipImage from '../assets/student_Internship.png'
// Import Enquiry.png using Vite-compatible method for files with spaces
const enquiryImage = new URL('../assets/Enquiry.png', import.meta.url).href
import vendorImage from '../assets/vendor.png'
import partnerImage from '../assets/Partner.png'

const LandingPage = () => {
  const svgRef = useRef(null)
  
  useEffect(() => {
    const updateLines = () => {
      if (!svgRef.current) return
      
      // Responsive sizing based on screen width
      const isMobile = window.innerWidth < 640 // sm breakpoint
      const isTablet = window.innerWidth < 768 // md breakpoint
      
      let radius, centerX, centerY
      if (isMobile) {
        radius = 90
        centerX = 128
        centerY = 128
      } else if (isTablet) {
        radius = 110
        centerX = 160
        centerY = 160
      } else {
        radius = 140
        centerX = 200
        centerY = 200
      }
      
      const angles = [0, 51.4, 102.8, 154.2, 205.6, 257, 308.4]
      
      const lines = svgRef.current.querySelectorAll('.connecting-line')
      lines.forEach((line, index) => {
        const fromAngle = angles[index]
        const toAngle = angles[(index + 1) % angles.length]
        
        const fromRad = (fromAngle * Math.PI) / 180
        const toRad = (toAngle * Math.PI) / 180
        
        const x1 = centerX + radius * Math.sin(fromRad)
        const y1 = centerY - radius * Math.cos(fromRad)
        const x2 = centerX + radius * Math.sin(toRad)
        const y2 = centerY - radius * Math.cos(toRad)
        
        line.setAttribute('x1', x1)
        line.setAttribute('y1', y1)
        line.setAttribute('x2', x2)
        line.setAttribute('y2', y2)
      })
    }
    
    updateLines()
    // Update lines on window resize
    window.addEventListener('resize', updateLines)
    return () => window.removeEventListener('resize', updateLines)
  }, [])
  const categories = [
    {
      title: 'Vendors / Suppliers',
      icon: null,
      image: vendorImage,
      link: '/vendor',
      description: 'Connect with vendors and suppliers'
    },
    {
      title: 'Partners',
      icon: null,
      image: partnerImage,
      link: '/partners',
      description: 'Partner with us for mutual growth'
    },
    {
      title: 'Job Seekers',
      icon: null,
      image: jobSeekerImage,
      link: '/jobseeker',
      description: 'Find your dream job'
    },
    {
      title: 'Internship Applicants',
      icon: null,
      image: studentInternshipImage,
      link: '/student-internship',
      description: 'Internship opportunities for students'
    },
    {
      title: 'Course Enquiry / Registration',
      icon: null,
      image: enquiryImage,
      link: '/training-session',
      description: 'Enhance your skills with training'
    },
    {
      title: 'Career Guidance',
      icon: null,
      image: careerGuidanceImage,
      link: '/career-guidance',
      description: 'Get expert career advice'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Snow Effect with Theme Colors */}
      <div className="snow-container fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="snowflake" style={{ '--delay': '0s', '--duration': '10s', '--left': '10%' }}></div>
        <div className="snowflake" style={{ '--delay': '1s', '--duration': '12s', '--left': '20%' }}></div>
        <div className="snowflake" style={{ '--delay': '2s', '--duration': '14s', '--left': '30%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.5s', '--duration': '11s', '--left': '40%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.5s', '--duration': '13s', '--left': '50%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.5s', '--duration': '15s', '--left': '60%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.8s', '--duration': '12s', '--left': '70%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.8s', '--duration': '14s', '--left': '80%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.2s', '--duration': '13s', '--left': '90%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.3s', '--duration': '11s', '--left': '15%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.3s', '--duration': '13s', '--left': '25%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.3s', '--duration': '15s', '--left': '35%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.7s', '--duration': '12s', '--left': '45%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.7s', '--duration': '14s', '--left': '55%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.7s', '--duration': '16s', '--left': '65%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.4s', '--duration': '11s', '--left': '75%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.4s', '--duration': '13s', '--left': '85%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.4s', '--duration': '15s', '--left': '95%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.6s', '--duration': '12s', '--left': '5%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.6s', '--duration': '14s', '--left': '12%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.6s', '--duration': '16s', '--left': '22%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.9s', '--duration': '13s', '--left': '32%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.9s', '--duration': '15s', '--left': '42%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.9s', '--duration': '17s', '--left': '52%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.2s', '--duration': '10s', '--left': '62%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.2s', '--duration': '12s', '--left': '72%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.2s', '--duration': '14s', '--left': '82%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.1s', '--duration': '11s', '--left': '92%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.1s', '--duration': '13s', '--left': '8%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.1s', '--duration': '15s', '--left': '18%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.4s', '--duration': '12s', '--left': '28%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.4s', '--duration': '14s', '--left': '38%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.4s', '--duration': '16s', '--left': '48%' }}></div>
      </div>

      {/* Hero Section */}
      <div
        className="relative overflow-hidden bg-white"
        style={{ minHeight: '500px' }}
      >
        {/* Animated Blurred Background Circles - Left Side */}
        <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden pointer-events-none z-0">
          {/* Large Blurred Circle 1 */}
          <div className="blurred-circle-1 absolute rounded-full" style={{
            width: '350px',
            height: '350px',
            backgroundColor: '#409891',
            opacity: 0.15,
            top: '5%',
            left: '3%',
            filter: 'blur(60px)'
          }}></div>
          
          {/* Medium Blurred Circle 2 */}
          <div className="blurred-circle-2 absolute rounded-full" style={{
            width: '280px',
            height: '280px',
            backgroundColor: '#48ADB7',
            opacity: 0.18,
            top: '45%',
            left: '12%',
            filter: 'blur(50px)'
          }}></div>
          
          {/* Small Blurred Circle 3 */}
          <div className="blurred-circle-3 absolute rounded-full" style={{
            width: '200px',
            height: '200px',
            backgroundColor: '#409891',
            opacity: 0.2,
            top: '65%',
            left: '5%',
            filter: 'blur(45px)'
          }}></div>
          
          {/* Medium Blurred Circle 4 */}
          <div className="blurred-circle-4 absolute rounded-full" style={{
            width: '320px',
            height: '320px',
            backgroundColor: '#48ADB7',
            opacity: 0.12,
            top: '20%',
            left: '22%',
            filter: 'blur(55px)'
          }}></div>
          
          {/* Small Blurred Circle 5 */}
          <div className="blurred-circle-5 absolute rounded-full" style={{
            width: '180px',
            height: '180px',
            backgroundColor: '#409891',
            opacity: 0.16,
            top: '55%',
            left: '28%',
            filter: 'blur(40px)'
          }}></div>
          
          {/* Large Blurred Circle 6 */}
          <div className="blurred-circle-6 absolute rounded-full" style={{
            width: '300px',
            height: '300px',
            backgroundColor: '#48ADB7',
            opacity: 0.14,
            top: '8%',
            left: '32%',
            filter: 'blur(60px)'
          }}></div>
          
          {/* Medium Blurred Circle 7 */}
          <div className="blurred-circle-7 absolute rounded-full" style={{
            width: '240px',
            height: '240px',
            backgroundColor: '#409891',
            opacity: 0.17,
            top: '75%',
            left: '18%',
            filter: 'blur(50px)'
          }}></div>
        </div>

        {/* Hero Content Container */}
        <div className="relative w-full h-full flex items-center justify-center z-20">
          <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Left: Content */}
            <div className="max-w-3xl space-y-10 relative z-20">
              {/* Main Quote */}
              <div className="space-y-8">
                <h1 className="hero-quote text-3xl md:text-4xl lg:text-5xl xl:text-6xl hero-fade-in italic" style={{ 
                  animationDelay: '0.3s',
                  lineHeight: '1.4',
                  letterSpacing: '0.02em',
                  wordSpacing: '0.1em',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{ color: '#409891' }}>&quot;Your journey to success begins at Lead Centre.&quot;</span>
                </h1>
              </div>
              
            </div>

            {/* Right: Animation with Infographic Elements */}
            <div className="relative flex items-center justify-center w-full md:w-auto" style={{ marginTop: '40px' }}>
              {/* Large teal circle background */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center mx-auto">
                {/* Outer circle that highlights after all letters zoom in */}
                <div className="outer-highlight-circle" />
                
                <div className="absolute inset-0 rounded-full" style={{
                  backgroundColor: '#3D98B4',
                  opacity: 0.15
                }} />
                
                {/* Rotating Letter Circles - D U R K K A S */}
                <div className="relative flex items-center justify-center">
                  {/* Rotating container */}
                  <div className="rotating-letters-container">
                    {/* Connecting lines SVG - Hidden */}
                    <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible', display: 'none' }}>
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3D98B4" stopOpacity="0.4" />
                          <stop offset="50%" stopColor="#3D98B4" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3D98B4" stopOpacity="0.4" />
                        </linearGradient>
                      </defs>
                      {/* Lines connecting letters - Hidden */}
                      <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                      <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                      <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                      <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                      <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                      <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                      <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                    </svg>
                    
                    {/* D */}
                    <div className="rotating-letter" style={{ '--angle': '0deg', '--delay': '0s' }}>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                        background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                        boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                      }}>
                        <span className="text-sm sm:text-base md:text-xl font-bold text-white">D</span>
                      </div>
                    </div>

                    {/* U */}
                    <div className="rotating-letter" style={{ '--angle': '51.4deg', '--delay': '0.3s' }}>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                        background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                        boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                      }}>
                        <span className="text-sm sm:text-base md:text-xl font-bold text-white">U</span>
                      </div>
                    </div>

                    {/* R */}
                    <div className="rotating-letter" style={{ '--angle': '102.8deg', '--delay': '0.6s' }}>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                        background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                        boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                      }}>
                        <span className="text-sm sm:text-base md:text-xl font-bold text-white">R</span>
                      </div>
                    </div>

                    {/* K */}
                    <div className="rotating-letter" style={{ '--angle': '154.2deg', '--delay': '0.9s' }}>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                        background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                        boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                      }}>
                        <span className="text-sm sm:text-base md:text-xl font-bold text-white">K</span>
                      </div>
                    </div>

                    {/* K */}
                    <div className="rotating-letter" style={{ '--angle': '205.6deg', '--delay': '1.2s' }}>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                        background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                        boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                      }}>
                        <span className="text-sm sm:text-base md:text-xl font-bold text-white">K</span>
                      </div>
                    </div>

                    {/* A */}
                    <div className="rotating-letter" style={{ '--angle': '257deg', '--delay': '1.5s' }}>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                        background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                        boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                      }}>
                        <span className="text-sm sm:text-base md:text-xl font-bold text-white">A</span>
                      </div>
                    </div>

                    {/* S */}
                    <div className="rotating-letter" style={{ '--angle': '308.4deg', '--delay': '1.8s' }}>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                        background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                        boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                      }}>
                        <span className="text-sm sm:text-base md:text-xl font-bold text-white">S</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Central Circle with LEAD */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white border-2 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center shadow-lg" style={{ borderColor: '#3D98B4' }}>
                    <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-center tracking-wide" style={{ color: '#3D98B4' }}>
                      LEAD
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white pb-0 pt-20 relative overflow-hidden">
        <div className="container-custom relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
            <h2 className="services-heading text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight" style={{ 
              color: '#1a1a1a',
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '0.02em'
            }}>
              Our <span style={{ 
                background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '600'
              }}>Services</span>
            </h2>
            <div className="w-24 h-px mx-auto mb-10" style={{ 
              background: 'linear-gradient(to right, transparent, #409891, #48ADB7, #409891, transparent)'
            }}></div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal" style={{ 
              color: '#666',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.01em'
            }}>
          Explore our services and find the perfect opportunity for you
        </p>
      </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <Card
            key={index}
            title={category.title}
            icon={category.icon}
                image={category.image}
            link={category.link}
            description={category.description}
                index={index}
          />
        ))}
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight" style={{ 
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
            </h2>
            <div className="w-24 h-px mx-auto mb-10" style={{ 
              background: 'linear-gradient(to right, transparent, #409891, #48ADB7, #409891, transparent)'
            }}></div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal" style={{ 
              color: '#666',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.01em'
            }}>
              We'd love to hear from you. Reach out to us through any of the following channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Contact Address */}
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

            {/* Right Side - Map */}
            <div className="bg-white rounded-2xl overflow-hidden" style={{
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
              height: '100%',
              minHeight: '400px'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.5!2d78.09!3d9.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b218981d%3A0x939e4b4c8b8b8b8b!2sAruppukottai%2C%20Tamil%20Nadu%20626101!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
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
  )
}

export default LandingPage
