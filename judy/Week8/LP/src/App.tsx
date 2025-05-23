import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RootLayout } from "./layout/root-layout";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { MyPage } from "./pages/MyPage";
import { ProtectedLayout } from "./layout/ProtectedLayout";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import { HomePage } from "./pages/HomePage";
import { LpDetail } from "./pages/LpDetail";
import { SearchPage } from "./pages/SearchPage";
import { ThrottlePage } from "./pages/ThrottlePage";

//publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
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
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/mypage",
            element: <MyPage />,
          },
          {
            path: "/lp/:lpId",
            element: <LpDetail />,
          },
          {
            path: "/search",
            element: <SearchPage />,
          },
          {
            path: "/throttle",
            element: <ThrottlePage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(publicRoutes);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  );
}

export default App;
