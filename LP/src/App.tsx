import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import Mypage from "./pages/MyPage.tsx";
import GoogleCallback from "./pages/GoogleCallback";

import ProtectedRoute from "../src/components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext"; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "mypage",
        element: (
          <ProtectedRoute>
            <Mypage />
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
