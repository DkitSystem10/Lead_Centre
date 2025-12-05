import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

// Import logo image using URL constructor for files with spaces
const logoImage = new URL('../assets/LEAD CENTRE.png', import.meta.url).href

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md" style={{ 
      borderBottom: 'none', 
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.03)'
    }}>
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20 max-w-7xl mx-auto">
          {/* Mobile Menu Button - Always visible on mobile */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: '#409891' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo Image */}
          <Link 
            to="/" 
            className="navbar-logo transition-all duration-500 relative group flex items-center ml-auto lg:ml-0"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <img 
              src={logoImage} 
              alt="Lead Centre" 
              className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain transition-all duration-300"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(64, 152, 145, 0.15))',
                minWidth: '150px'
              }}
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
