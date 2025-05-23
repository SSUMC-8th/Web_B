
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


export const ProtectedLayout = () => {
  const { accessToken } = useAuth()
  const location = useLocation()

  if(!accessToken){
    alert("로그인 후 사용가능합니다.")
    return <Navigate to={"/login"} state={{location}} replace />
  }

  return(<div className = "h-dvh flex flex-col">
    <Navbar />
    <main className='flex-1 mt-10'>
      <Outlet />
    </main>
    <Footer />
  </div>)
}

export default ProtectedLayout