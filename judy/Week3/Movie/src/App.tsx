import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout/root-layout";
import { HomePage } from "./page/HomePage";
import { MovieListPage } from "./page/MovieListPage";
import { MovieDetailPage } from "./page/MovieDetailPage";

const movieListTypes = ["popular", "upcoming", "top_rated", "now_playing"];

const movieListRoutes = movieListTypes.map((type) => ({
  path: `movies/${type}`,
  element: <MovieListPage />,
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      ...movieListRoutes,
    ],
  },
  {
    path: "movie/detail/:id",
    element: <MovieDetailPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
