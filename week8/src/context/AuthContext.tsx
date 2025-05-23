import { createContext, PropsWithChildren, use, useContext } from 'react';
import { RequestSigninDto } from '../types/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { useState } from 'react';
import { postSignin, postLogout } from '../apis/auth';



interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
})

export const AuthProvider = ({ children }:PropsWithChildren) => {

  const {
    getItem: getAccessTockenFromStorage,
    setItem: setAccessTockenFromStorage,
    removeItem: removeAccessTockenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
  const {
    getItem: getRefreshTockenFromStorage,
    setItem: setRefreshTockenFromStorage,
    removeItem: removeRefreshTockenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN)

  const[accessToken, setAccessToken] = useState<string | null>(  //lazy initialization
    getAccessTockenFromStorage(),
  );
  const[refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTockenFromStorage(),
  );

  const login = async (signinData:RequestSigninDto) => {
    
    try{
      const{data}=await postSignin(signinData)

      if(data){
        const newaccessToken = data.accessToken
        const newrefreshToken = data.refreshToken
        
        setAccessTockenFromStorage(newaccessToken)
        setRefreshTockenFromStorage(newrefreshToken)

        setAccessToken(newaccessToken)
        setRefreshToken(newrefreshToken)
        alert("로그인 성공")
        window.location.href = "/my"
      }
    }catch(error){
      console.error("로그인 실패", error)  //toast UI로 바꾸기
      alert("로그인 실패")
    }
  };
  const logout = async () => {
    try{
      await postLogout()
      removeAccessTockenFromStorage()
      removeRefreshTockenFromStorage()
      setAccessToken(null)
      setRefreshToken(null)
      alert("로그아웃 성공")
    }catch(error){
      console.error("로그아웃 에러", error) //toast UI로 바꾸기
      alert("로그아웃 실패")
    }
  };
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context: AuthContextType = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext를 찾을 수 없음');
  }
  return context;
}
