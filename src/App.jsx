import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import LandingPage from './pages/LandingPage'
import VendorPage from './pages/VendorPage'
import PartnersPage from './pages/PartnersPage'
import JobSeekerPage from './pages/JobSeekerPage'
import StudentInternshipPage from './pages/StudentInternshipPage'
import TrainingSessionPage from './pages/TrainingSessionPage'
import CareerGuidancePage from './pages/CareerGuidancePage'
import SuccessPageWrapper from './pages/SuccessPage'
import ContactPage from './pages/ContactPage'
import GeneralEnquiryPage from './pages/GeneralEnquiryPage'
import ReportsPage from './pages/ReportsPage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/vendor" element={<VendorPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/jobseeker" element={<JobSeekerPage />} />
          <Route path="/student-internship" element={<StudentInternshipPage />} />
          <Route path="/training-session" element={<TrainingSessionPage />} />
          <Route path="/career-guidance" element={<CareerGuidancePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/general-enquiry" element={<GeneralEnquiryPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/success" element={<SuccessPageWrapper />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
