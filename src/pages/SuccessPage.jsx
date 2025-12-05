import { useLocation } from 'react-router-dom'
import SuccessPage from '../components/SuccessPage'

const SuccessPageWrapper = () => {
  const location = useLocation()
  const { formType, title } = location.state || {}
  
  const defaultTitle = 'Application Submitted Successfully!'
  const defaultMessage = 'Thank you for your submission. We will get back to you soon.'

  return (
    <SuccessPage 
      title={title || defaultTitle}
      message={`Your ${formType || 'application'} has been received successfully. ${defaultMessage}`}
    />
  )
}

export default SuccessPageWrapper













