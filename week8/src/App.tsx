
import "./App.css"
import { createBrowserRouter, RouterProvider } from 'react-router'

import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import HomeLayout from './layouts/HomeLayout'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedLayout from './layouts/ProtectedLayout'
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LpDetailPage } from './pages/LpDetailPage'


//publicRoutes : 인증없이 접근 가능한 라우트
const publicRoutes = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage />},
      {path: 'signup', element: <SignupPage />},
      {path: 'v1/auth/google/callback' , element: <GoogleLoginRedirectPage />},
      {path: 'lps/:lpid', element: <LpDetailPage />},
    ],
  }
] 
//protectedRoutes : 인증이 필요한 라우트
const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedLayout/>,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'my',
        element: <MyPage />,
      }
    ]
  }
]
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes,])

export const queryClient = new QueryClient({
  
  defaultOptions: {
    queries:{
      retry: 3,
    }
  }
} // QueryClient의 기본 옵션을 설정합니다.(전역적으로 모든 쿼리에 적용됨)
)

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} 
      </AuthProvider>
    </QueryClientProvider>
  )
}
export default App
