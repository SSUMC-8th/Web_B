import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout/root-layout";
import { HomePage } from "./page/HomePage";
import { MovieListPage } from "./page/MovieListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies/popular",
        element: <MovieListPage />,
      },
      {
        path: "movies/upcoming",
        element: <MovieListPage />,
      },
      {
        path: "movies/top_rated",
        element: <MovieListPage />,
      },
      {
        path: "movies/now_playing",
        element: <MovieListPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
