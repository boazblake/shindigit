import {ReactNode} from 'react'
import {useNavigate,useLocation} from 'react-router-dom' 

interface LayoutContainerProps {
  children: ReactNode
}

const LayoutContainer = ({children}: LayoutContainerProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = () =>  location.pathname === '/home' 
  
  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto">
    <nav>
    {!isHomePage() ? <button
        onClick={goBack}
        className="mb-4 text-blue-500 hover:text-blue-700"
        type="button"
        aria-label="Go back to the previous page">
    ← Back</button>: null}</nav>
    {children}
    </div>
  )
}

export default LayoutContainer
