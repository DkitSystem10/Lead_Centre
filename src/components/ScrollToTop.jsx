import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  const isFirstLoad = useRef(true)

  useEffect(() => {
    // On first load, scroll instantly (no animation)
    if (isFirstLoad.current) {
      window.scrollTo(0, 0)
      isFirstLoad.current = false
    } else {
      // On route changes, smooth scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [pathname])

  return null
}

export default ScrollToTop

