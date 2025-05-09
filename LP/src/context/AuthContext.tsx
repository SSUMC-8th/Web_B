import {
    createContext,
    useContext,
    useState,
    useEffect,
    PropsWithChildren,
  } from "react";
  import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/key";
  
  interface AuthTokens {
    accessToken: string;
    refreshToken: string;
  }

  interface AuthContextType {
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean; // 로딩 상태 추가
    logout: () => void;
    login: (tokens: AuthTokens) => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // 초기 로딩
  
    useEffect(() => {
        
      const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  
      if (storedAccessToken) setAccessToken(storedAccessToken);
      if (storedRefreshToken) setRefreshToken(storedRefreshToken);
      console.log("accessToken loaded", storedAccessToken);
      console.log("isLoggedIn?", !!storedAccessToken);
  
      setIsLoading(false); // context 초기화 완료
    }, []);
  
    const logout = () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      setAccessToken(null);
      setRefreshToken(null);
    };

    const login = async ({ accessToken, refreshToken }: AuthTokens) => {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem("accessToken", accessToken);    
      localStorage.setItem("refreshToken", refreshToken);  
    };
  
    const value: AuthContextType = {
      isLoggedIn: !!accessToken,
      accessToken,
      refreshToken,
      logout,
      login,
      isLoading, 
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within AuthProvider");
    return context;
  };