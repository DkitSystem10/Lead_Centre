import { Link } from 'react-router-dom'

const SuccessPage = ({ title = 'Application Submitted Successfully!', message = 'Thank you for your submission. We will get back to you soon.' }) => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card-zoho p-10">
          <div className="mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#0B3A62] to-[#1E5A8A] mb-6 shadow-sm">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            {message}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <span>Back to Home</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 transition-colors duration-150"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
