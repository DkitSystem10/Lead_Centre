import { useNavigate } from 'react-router-dom'

const Card = ({ title, icon, image, link, description, index }) => {
  const navigate = useNavigate()

  const handleButtonClick = (e) => {
    e.preventDefault()
    navigate(link)
  }

  return (
    <div className="service-card h-full flex flex-col group relative overflow-hidden bg-white rounded-2xl transition-all duration-500" style={{
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
      transform: 'perspective(1000px) translateZ(0)',
      transformStyle: 'preserve-3d'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'perspective(1000px) translateZ(20px) rotateX(2deg) rotateY(-2deg)'
      e.currentTarget.style.boxShadow = '0 20px 60px rgba(64, 152, 145, 0.4), 0 10px 30px rgba(72, 173, 183, 0.3), 0 0 0 1px rgba(64, 152, 145, 0.2)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'perspective(1000px) translateZ(0)'
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)'
    }}>
      
      <div className="flex flex-col h-full relative z-10 p-8">
        {image ? (
          <>
            {/* Image Container */}
            <div className="w-full flex items-center justify-center mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-500 group-hover:shadow-lg" style={{ 
              height: '220px',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <div className="relative w-full h-full overflow-hidden">
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-semibold mb-3 transition-all duration-300" style={{ 
              color: '#1a1a1a',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.02em'
            }}>
              {title}
            </h3>
            
            {/* Description */}
            {description && (
              <p className="text-base leading-relaxed mb-6 flex-grow transition-all duration-300" style={{ 
                color: '#666',
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.6'
              }}>
                {description}
              </p>
            )}
            
            {/* Button */}
            <button
              onClick={handleButtonClick}
              className="service-card-btn w-full mt-auto py-3.5 px-6 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden group/btn"
              style={{
                background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(64, 152, 145, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 4px 16px rgba(64, 152, 145, 0.35)'
                e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 2px 8px rgba(64, 152, 145, 0.2)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                {description || title}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
            </button>
          </>
        ) : (
          <>
            {/* Icon */}
            <div className="mb-6 transition-all duration-500 group-hover:scale-110 flex items-center justify-center" style={{ minHeight: '80px' }}>
              <span className="text-6xl transition-all duration-500">{icon}</span>
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-semibold mb-3 transition-all duration-300" style={{ 
              color: '#1a1a1a',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.02em'
            }}>
              {title}
            </h3>
            
            {/* Description */}
            {description && (
              <p className="text-base leading-relaxed mb-6 flex-grow transition-all duration-300" style={{ 
                color: '#666',
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.6'
              }}>
                {description}
              </p>
            )}
            
            {/* Button */}
            <button
              onClick={handleButtonClick}
              className="service-card-btn w-full mt-auto py-3.5 px-6 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden group/btn"
              style={{
                background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(64, 152, 145, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 4px 16px rgba(64, 152, 145, 0.35)'
                e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 2px 8px rgba(64, 152, 145, 0.2)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                {description || title}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Card
