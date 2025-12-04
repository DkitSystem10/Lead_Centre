import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({ children }) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isContactPage = location.pathname === '/contact'
  const showSidebar = !isHomePage && !isContactPage
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuClick={toggleSidebar} />
      <div className="flex flex-grow relative">
        {showSidebar && <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />}
        <main className={`flex-grow w-full lg:w-auto ${isHomePage || isContactPage ? 'bg-white' : 'bg-[#F5F7FA]'}`}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
