import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
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
    <aside className="w-56 lg:w-64 h-screen sticky top-0 flex flex-col shadow-lg" style={{
      background: 'linear-gradient(to bottom, #E6E5E1 0%, #E6E5E1 100%)',
      borderRight: '1px solid rgba(64, 152, 145, 0.15)'
    }}>
      <div className="p-4 flex-grow overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 lg:px-5 py-3.5 rounded-xl text-base lg:text-lg font-medium transition-all duration-200 ${
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
  )
}

export default Sidebar

