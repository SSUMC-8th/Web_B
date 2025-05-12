import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from "./layout/root-layout";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { MyPage } from "./pages/MyPage";
import { ProtectedLayout } from "./layout/ProtectedLayout";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import { HomePage } from "./pages/HomePage";

//publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/v1/auth/google/callback",
        element: <AuthCallbackPage />,
      },
    ],
  },
];

// protectedRoutes: 인증이 필요한 라우트

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
