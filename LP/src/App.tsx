import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import Mypage from "./pages/MyPage.tsx";
import GoogleCallback from "./pages/GoogleCallback";
import LPDetail from "./pages/LPDetail.tsx";
import SearchResult from "./pages/SearchResult";

import ProtectedRoute from "../src/components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, // ✅ 모든 하위 경로는 이 레이아웃을 씀
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "search", element: <SearchResult /> },
      {
        path: "mypage",
        element: (
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        ),
      },
      {
        path: "lp/:LPid",
        element: (
          <ProtectedRoute>
            <LPDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/v1/auth/google/callback",
    element: <GoogleCallback />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
