import { useState, useEffect } from 'react'

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Wave Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)'
      }}>
        <svg className="absolute bottom-0 left-0 w-full h-32" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72c05.54,15.88,94.24,29.82,137.65,28.48,54.92-1.68,107.54-20.13,161.35-30.17C1044.37,60.29,1115.33,55.19,1200,52.47V120H0V46.29Z" fill="rgba(255, 255, 255, 0.1)"/>
          <path d="M0,66.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,52.43,512.34,73.67,583,92c05.54,15.88,94.24,29.82,137.65,28.48,54.92-1.68,107.54-20.13,161.35-30.17C1044.37,80.29,1115.33,75.19,1200,72.47V120H0V66.29Z" fill="rgba(255, 255, 255, 0.15)"/>
          <path d="M0,86.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,72.43,512.34,93.67,583,112c05.54,15.88,94.24,29.82,137.65,28.48,54.92-1.68,107.54-20.13,161.35-30.17C1044.37,100.29,1115.33,95.19,1200,92.47V120H0V86.29Z" fill="rgba(255, 255, 255, 0.2)"/>
        </svg>
      </div>

      <div className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Copyright Text - Centered */}
          <div className="text-center">
            <p className="text-base font-medium text-white">
              © Durkkas Innovation Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/911234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 z-50"
        style={{
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)'
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.6), 0 4px 15px rgba(37, 211, 102, 0.4), 0 0 0 4px rgba(37, 211, 102, 0.1)'
          e.target.style.transform = 'translateY(-2px) scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.4)'
          e.target.style.transform = 'translateY(0) scale(1)'
        }}
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-7 h-7 text-white transition-all duration-300" fill="currentColor" viewBox="0 0 24 24" style={{
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
        }}
        onMouseEnter={(e) => {
          e.target.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
        }}
        onMouseLeave={(e) => {
          e.target.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
        }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </footer>
  )
}

export default Footer

