import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ReportsPage = () => {
  const [stats, setStats] = useState({
    vendors: 0,
    partners: 0,
    jobSeekers: 0,
    studentInternships: 0,
    courseEnquiries: 0,
    careerGuidance: 0,
    total: 0
  })
  const [categoryStats, setCategoryStats] = useState({
    vendors: [],
    partners: [],
    jobSeekers: [],
    studentInternships: [],
    courseEnquiries: [],
    careerGuidance: []
  })
  const [showDetails, setShowDetails] = useState(null) // 'vendors', 'partners', 'jobSeekers', etc.
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    fetchAllStats()
  }, [])

  const fetchAllStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch counts and category data from all tables
      const [
        vendorsResult,
        partnersResult,
        jobSeekersResult,
        studentInternshipsResult,
        courseEnquiriesResult,
        careerGuidanceResult,
        b2bResult,
        vendorCategoryData,
        partnersCategoryData,
        jobSeekersCategoryData,
        studentInternshipsCategoryData,
        courseEnquiriesCategoryData,
        careerGuidanceCategoryData
      ] = await Promise.all([
        supabase.from('vendor_applications').select('id', { count: 'exact', head: true }),
        supabase.from('partner').select('id', { count: 'exact', head: true }),
        supabase.from('job_seeker_applications').select('id', { count: 'exact', head: true }),
        supabase.from('student_internship_applications').select('id', { count: 'exact', head: true }),
        supabase.from('course_enquiry_registrations').select('id', { count: 'exact', head: true }),
        supabase.from('career_guidance_applications').select('id', { count: 'exact', head: true }),
        supabase.from('b2b_applications').select('id', { count: 'exact', head: true }),
        supabase.from('vendor_applications').select('category'),
        supabase.from('partner').select('category'),
        supabase.from('job_seeker_applications').select('category'),
        supabase.from('student_internship_applications').select('category'),
        supabase.from('course_enquiry_registrations').select('category, sub_category'),
        supabase.from('career_guidance_applications').select('category')
      ])

      // Combine vendors and B2B
      const vendorsCount = vendorsResult.count || 0
      const b2bCount = b2bResult.count || 0
      const combinedVendors = vendorsCount + b2bCount

      // Helper function to calculate category stats
      const calculateCategoryStats = (data, useSubCategory = false) => {
        const categoryMap = new Map()
        if (data && data.data) {
          data.data.forEach(item => {
            const category = useSubCategory 
              ? (item.sub_category || item.category || 'Uncategorized')
              : (item.category || 'Uncategorized')
            categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
          })
        }
        return Array.from(categoryMap.entries())
          .map(([category, count]) => ({ category, count }))
          .sort((a, b) => b.count - a.count)
      }

      // Calculate stats for all categories
      const vendorStats = calculateCategoryStats(vendorCategoryData)
      if (b2bCount > 0) {
        vendorStats.push({ category: 'B2B Applications', count: b2bCount })
        vendorStats.sort((a, b) => b.count - a.count)
      }

      const partnersStats = calculateCategoryStats(partnersCategoryData)
      const jobSeekersStats = calculateCategoryStats(jobSeekersCategoryData)
      const studentInternshipsStats = calculateCategoryStats(studentInternshipsCategoryData)
      const courseEnquiriesStats = calculateCategoryStats(courseEnquiriesCategoryData, true) // Use sub_category
      const careerGuidanceStats = calculateCategoryStats(careerGuidanceCategoryData)

      setCategoryStats({
        vendors: vendorStats,
        partners: partnersStats,
        jobSeekers: jobSeekersStats,
        studentInternships: studentInternshipsStats,
        courseEnquiries: courseEnquiriesStats,
        careerGuidance: careerGuidanceStats
      })

      const newStats = {
        vendors: combinedVendors,
        partners: partnersResult.count || 0,
        jobSeekers: jobSeekersResult.count || 0,
        studentInternships: studentInternshipsResult.count || 0,
        courseEnquiries: courseEnquiriesResult.count || 0,
        careerGuidance: careerGuidanceResult.count || 0,
        total: 0
      }

      newStats.total = 
        newStats.vendors + 
        newStats.partners + 
        newStats.jobSeekers + 
        newStats.studentInternships + 
        newStats.courseEnquiries + 
        newStats.careerGuidance

      setStats(newStats)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching stats:', err)
      setError('Failed to load statistics. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Vendors / Suppliers',
      count: stats.vendors,
      color: 'from-blue-500 to-blue-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: 'Partners',
      count: stats.partners,
      color: 'from-green-500 to-green-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Job Seekers',
      count: stats.jobSeekers,
      color: 'from-purple-500 to-purple-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Internship Applicants',
      count: stats.studentInternships,
      color: 'from-orange-500 to-orange-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Course Enquiry / Registration',
      count: stats.courseEnquiries,
      color: 'from-pink-500 to-pink-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Career Guidance',
      count: stats.careerGuidance,
      color: 'from-teal-500 to-teal-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ]

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#409891] mb-4"></div>
            <p className="text-gray-600">Loading statistics...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchAllStats}
              className="px-4 py-2 bg-[#409891] text-white rounded-md hover:bg-[#48ADB7] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-6 md:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10 px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>
                Admin Dashboard - Reports
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Overview of all leads and applications across categories
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={fetchAllStats}
                className="px-4 py-2 bg-[#409891] text-white rounded-lg hover:bg-[#48ADB7] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-2">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>

        {/* Total Stats Card */}
        <div className="mb-8 px-4">
          <div className="bg-gradient-to-r from-[#409891] to-[#48ADB7] rounded-xl p-6 md:p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white/80 text-sm md:text-base mb-1">Total Leads</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  {stats.total.toLocaleString()}
                </h2>
              </div>
              <div className="text-white/80">
                <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Category Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4">
          {statCards.map((card, index) => {
            const cardKey = card.title === 'Vendors / Suppliers' ? 'vendors' :
                          card.title === 'Partners' ? 'partners' :
                          card.title === 'Job Seekers' ? 'jobSeekers' :
                          card.title === 'Internship Applicants' ? 'studentInternships' :
                          card.title === 'Course Enquiry / Registration' ? 'courseEnquiries' :
                          card.title === 'Career Guidance' ? 'careerGuidance' : null
            
            return (
            <div
              key={card.title}
              onClick={() => cardKey && setShowDetails(cardKey)}
              className={`bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                cardKey ? 'cursor-pointer' : ''
              }`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color} text-white`}>
                  {card.icon}
                </div>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-bold" style={{ color: '#1F2937' }}>
                    {card.count.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm md:text-base font-semibold text-gray-700">
                  {card.title}
                </h3>
                {cardKey && (
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${card.color} transition-all duration-500`}
                    style={{
                      width: stats.total > 0 ? `${(card.count / stats.total) * 100}%` : '0%'
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.total > 0 ? `${((card.count / stats.total) * 100).toFixed(1)}%` : '0%'} of total
                </p>
              </div>
            </div>
            )
          })}
        </div>

        {/* Category Subcategory Details Modal */}
        {showDetails && (() => {
          const categoryInfo = {
            vendors: { 
              title: 'Vendors / Suppliers', 
              count: stats.vendors, 
              gradient: 'linear-gradient(to right, #3B82F6, #2563EB)',
              bgGradient: 'linear-gradient(to right, #EFF6FF, #DBEAFE)',
              hoverColor: '#DBEAFE',
              cardColor: '#3B82F6'
            },
            partners: { 
              title: 'Partners', 
              count: stats.partners, 
              gradient: 'linear-gradient(to right, #10B981, #059669)',
              bgGradient: 'linear-gradient(to right, #ECFDF5, #D1FAE5)',
              hoverColor: '#D1FAE5',
              cardColor: '#10B981'
            },
            jobSeekers: { 
              title: 'Job Seekers', 
              count: stats.jobSeekers, 
              gradient: 'linear-gradient(to right, #8B5CF6, #7C3AED)',
              bgGradient: 'linear-gradient(to right, #F5F3FF, #EDE9FE)',
              hoverColor: '#EDE9FE',
              cardColor: '#8B5CF6'
            },
            studentInternships: { 
              title: 'Internship Applicants', 
              count: stats.studentInternships, 
              gradient: 'linear-gradient(to right, #F97316, #EA580C)',
              bgGradient: 'linear-gradient(to right, #FFF7ED, #FFEDD5)',
              hoverColor: '#FFEDD5',
              cardColor: '#F97316'
            },
            courseEnquiries: { 
              title: 'Course Enquiry / Registration', 
              count: stats.courseEnquiries, 
              gradient: 'linear-gradient(to right, #EC4899, #DB2777)',
              bgGradient: 'linear-gradient(to right, #FDF2F8, #FCE7F3)',
              hoverColor: '#FCE7F3',
              cardColor: '#EC4899'
            },
            careerGuidance: { 
              title: 'Career Guidance', 
              count: stats.careerGuidance, 
              gradient: 'linear-gradient(to right, #14B8A6, #0D9488)',
              bgGradient: 'linear-gradient(to right, #F0FDFA, #CCFBF1)',
              hoverColor: '#CCFBF1',
              cardColor: '#14B8A6'
            }
          }
          
          const info = categoryInfo[showDetails]
          const currentStats = categoryStats[showDetails] || []
          
          return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDetails(null)}>
              <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 flex items-center justify-between" style={{ background: info.bgGradient }}>
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#1F2937' }}>
                      {info.title} - Subcategory Wise Report
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Detailed breakdown of leads by subcategory
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDetails(null)}
                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-6 rounded-lg p-4 text-white" style={{ background: info.gradient }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90 mb-1">Total Leads</p>
                        <p className="text-3xl font-bold">{info.count.toLocaleString()}</p>
                      </div>
                      <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  
                  {currentStats.length > 0 ? (
                    <>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Subcategory Breakdown</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                S.No
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subcategory
                              </th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Leads Count
                              </th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Percentage
                              </th>
                              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Visual
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {currentStats.map((item, index) => {
                              const percentage = info.count > 0 ? (item.count / info.count) * 100 : 0
                              return (
                                <tr key={item.category} className="transition-colors" style={{ '--hover-color': info.hoverColor }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = info.hoverColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                  <td className="px-4 py-3 text-sm text-gray-500">
                                    {index + 1}
                                  </td>
                                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                    {item.category || 'Uncategorized'}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-semibold">
                                    {item.count.toLocaleString()}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-500 text-right">
                                    {percentage.toFixed(2)}%
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div
                                        className="h-2 rounded-full transition-all duration-500"
                                        style={{ 
                                          width: `${percentage}%`,
                                          background: info.gradient
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                          <tfoot className="bg-gray-50 font-semibold">
                            <tr>
                              <td colSpan="2" className="px-4 py-3 text-sm text-gray-900">
                                Total
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                {info.count.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                100.00%
                              </td>
                              <td className="px-4 py-3"></td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      
                      {/* Summary Cards */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="rounded-lg p-4 border" style={{ backgroundColor: info.hoverColor, borderColor: info.cardColor + '40' }}>
                          <p className="text-xs font-medium mb-1" style={{ color: info.cardColor }}>Top Subcategory</p>
                          <p className="text-lg font-bold" style={{ color: info.cardColor }}>
                            {currentStats[0]?.category || 'N/A'}
                          </p>
                          <p className="text-sm mt-1" style={{ color: info.cardColor + 'CC' }}>
                            {currentStats[0]?.count.toLocaleString() || 0} leads
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <p className="text-xs text-green-600 font-medium mb-1">Active Subcategories</p>
                          <p className="text-lg font-bold text-green-900">
                            {currentStats.length}
                          </p>
                          <p className="text-sm text-green-700 mt-1">
                            Subcategories with leads
                          </p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <p className="text-xs text-purple-600 font-medium mb-1">Average per Subcategory</p>
                          <p className="text-lg font-bold text-purple-900">
                            {currentStats.length > 0 
                              ? Math.round(info.count / currentStats.length).toLocaleString()
                              : 0
                            }
                          </p>
                          <p className="text-sm text-purple-700 mt-1">
                            Leads per subcategory
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 text-lg">No subcategory data available</p>
                      <p className="text-gray-400 text-sm mt-2">Leads will appear here once applications are submitted</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })()}

        {/* Summary Table */}
        <div className="mt-8 px-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold" style={{ color: '#1F2937' }}>
                Category Summary
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statCards.map((card) => (
                    <tr key={card.title} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {card.title}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right font-semibold">
                        {card.count.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-right">
                        {stats.total > 0 ? `${((card.count / stats.total) * 100).toFixed(2)}%` : '0%'}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-3 text-sm text-gray-900">Total</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {stats.total.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage

