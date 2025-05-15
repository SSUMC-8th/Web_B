import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/key";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: { id: number; name: string; email: string }; // id 추가
}

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: { id: number; name: string; email?: string } | null; // id 포함, email optional
  isLoading: boolean; // 로딩 상태 추가
  logout: () => void;
  login: (tokens: AuthTokens) => Promise<void>;
  setUser: (user: User | null) => void;
}

interface User {
  id: number;
  name: string;
  email?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const storedUser = localStorage.getItem("user");

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);

    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("복원된 user:", parsedUser);
        setUser(parsedUser);
      } else {
        setUser(null); // 없으면 null
      }
    } catch (error) {
      console.warn("Invalid JSON in localStorage 'user':", storedUser);
      setUser(null); // 파싱 에러 시 fallback
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem("user");
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const login = async ({ accessToken, refreshToken, user }: AuthTokens) => {
    console.log("✅ login called with user:", user); // 이거 추가해서 확인
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user)); // ✅ 저장
  };

  const value: AuthContextType = {
    isLoggedIn: !!accessToken,
    accessToken,
    refreshToken,
    logout,
    login,
    user,
    isLoading,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
