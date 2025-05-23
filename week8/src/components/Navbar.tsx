import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
  const{ accessToken } = useAuth()
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <Link 
          to='/' 
          className='text-xl font-bold text-gray-900 dark:text-white'>
          돌려돌려 돌림판
        </Link>
        <div className='space-x-6'>
          {!accessToken && (
            <>
            <Link
              to='/login'
              className='text-gray-700 dark:text-gray-300 hover:text-[#807bff]'>
              로그인 
            </Link>
            <Link
              to='/signup'
              className='text-gray-700 dark:text-gray-300 hover:text-[#807bff]'>
              회원가입 
            </Link>
            </>
          )}
          {accessToken && (
            <Link
              to='/my'
              className='text-gray-700 dark:text-gray-300 hover:text-[#807bff]'>
              마이페이지
            </Link>
          )}
          <Link 
            to={'/search'}
            className='text-gray-700 dark:text-gray-300 hover:text-[#807bff]'
            >
            검색
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar