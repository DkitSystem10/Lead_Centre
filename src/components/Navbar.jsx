import { Link } from 'react-router-dom'

// Import logo image using URL constructor for files with spaces
const logoImage = new URL('../assets/LEAD CENTRE.png', import.meta.url).href

const Navbar = () => {

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md" style={{ 
      borderBottom: 'none', 
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.03)'
    }}>
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 max-w-7xl mx-auto">
          {/* Logo Image */}
          <Link 
            to="/" 
            className="navbar-logo transition-all duration-500 relative group flex items-center"
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
              className="h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain transition-all duration-300"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(64, 152, 145, 0.15))',
                minWidth: '200px'
              }}
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
