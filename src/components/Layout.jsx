import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({ children }) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isContactPage = location.pathname === '/contact'
  const showSidebar = !isHomePage && !isContactPage

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        {showSidebar && <Sidebar />}
        <main className={`flex-grow ${isHomePage || isContactPage ? 'bg-white' : 'bg-[#F5F7FA]'}`}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
