
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
    ],
  }
] 
//protectedRoutes : 인증이 필요한 라우트
const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedLayout/>,
    children: [
      {
        path: 'my',
        element: <MyPage />,
      }
    ]
  }
]
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes,])

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
export default App
