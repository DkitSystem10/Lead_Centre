import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose, showOnDesktop = true }) => {
  const location = useLocation()

  const menuItems = [
    {
      title: 'Home',
      path: '/',
      icon: null
    },
    {
      title: 'Vendors / Suppliers',
      path: '/vendor',
      icon: null
    },
    {
      title: 'Partners',
      path: '/partners',
      icon: null
    },
    {
      title: 'Job Seekers',
      path: '/jobseeker',
      icon: null
    },
    {
      title: 'Internship Applicants',
      path: '/student-internship',
      icon: null
    },
    {
      title: 'Course Enquiry / Registration',
      path: '/training-session',
      icon: null
    },
    {
      title: 'Career Guidance',
      path: '/career-guidance',
      icon: null
    }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 left-0 h-screen flex flex-col shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${!showOnDesktop ? 'lg:hidden' : ''}
          w-64 lg:w-56 xl:w-64
        `}
        style={{
          background: 'linear-gradient(to bottom, #E6E5E1 0%, #E6E5E1 100%)',
          borderRight: '1px solid rgba(64, 152, 145, 0.15)'
        }}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold" style={{ color: '#409891' }}>Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: '#409891' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 flex-grow overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center px-4 lg:px-5 py-3.5 rounded-xl text-sm sm:text-base lg:text-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-md font-semibold'
                      : 'hover:text-white hover:shadow-sm border border-transparent'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                    border: '1px solid rgba(64, 152, 145, 0.3)',
                    boxShadow: '0 4px 12px rgba(64, 152, 145, 0.25)',
                    color: '#FFFFFF'
                  } : {
                    border: '1px solid transparent',
                    color: '#1F2937',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(64, 152, 145, 0.15) 0%, rgba(72, 173, 183, 0.15) 100%)'
                      e.currentTarget.style.borderColor = 'rgba(64, 152, 145, 0.3)'
                      e.currentTarget.style.color = '#409891'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.color = '#1F2937'
                    }
                  }}
                >
                  <span className="truncate">{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
        
        {/* Copyright Section at Bottom */}
        <div className="p-4" style={{
          borderTop: '1px solid rgba(64, 152, 145, 0.15)'
        }}>
          <p className="text-xs text-center" style={{ color: '#666' }}>
            © {new Date().getFullYear()} Lead Centre. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

