import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { LOCAL_STORAGE_KEY } from '../constants/key'


const GoogleLoginRedirectPage = () => {

  const{setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN,)
  const{setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN,)

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search)
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.REFRESH_TOKEN)

    if(accessToken && refreshToken){
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      window.location.href = '/my'
    }
  },[setAccessToken, setRefreshToken]) // 구글 로그인 리다이렉트 페이지



  return (
    <div>
      <h1 className='text-2xl font-bold text-center'>구글 로그인 중입니다...</h1>
      <div className='flex justify-center items-center h-screen'>
        <img src="/loading.gif" alt="로딩중" />
      </div>
    </div>
  )
}

export default GoogleLoginRedirectPage