
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { use } from 'react'


export const ProtectedLayout = () => {
  const { accessToken } = useAuth()
  const location = useLocation()

  if(!accessToken){
    alert("로그인 후 사용가능합니다.")
    return <Navigate to={"/login"} state={{location}} replace />
  }

  return<Outlet/>
}

export default ProtectedLayout