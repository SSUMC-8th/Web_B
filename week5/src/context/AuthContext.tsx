import { createContext, PropsWithChildren } from 'react';
import { RequestSigninDto } from '../types/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';


interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContextType = createContext<AuthContextType>({
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

  const[accessToken, setAccessToken] = useState<string | null>(
    getAccessTockenFromStorage(),
  );
}