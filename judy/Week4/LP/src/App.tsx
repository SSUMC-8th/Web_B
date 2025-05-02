import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout/root-layout";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
