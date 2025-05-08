import { useEffect } from 'react'
import { getMyInfo } from '../apis/auth'
import { useState } from 'react'
import { ResponseMyInfoDto } from '../types/auth'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const MyPage = () => {
  const navigate = useNavigate()
  const {logout} = useAuth()
  const [data,setData] = useState<ResponseMyInfoDto|null>(null)
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo()
      console.log(response)

      setData(response)
    }
    getData()
  }, [])
  
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }
  
  return (
    <div>
      <h1>{data?.data.name}님 환영합니다.</h1>
      <img src={data?.data.avatar as string} alt="구글 아바타" />
      <h1>{data?.data.email}</h1>

      <button onClick={handleLogout} className='cursor-pointer hover:scale-90 bg-[#807bff] text-white p-5 rounded-md'>
        로그아웃
      </button>
    </div>
  )
}

export default MyPage