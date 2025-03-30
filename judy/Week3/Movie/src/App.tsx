import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout/root-layout";
import { HomePage } from "./page/HomePage";
import { PopularPage } from "./page/PopularPage";
import { UpComingPage } from "./page/UpComingPage";
import { NowPlaying } from "./page/NowPlaying";
import { TopRatedPage } from "./page/TopRatedPage";

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
        element: <PopularPage />,
      },
      {
        path: "movies/upcoming",
        element: <UpComingPage />,
      },
      {
        path: "movies/top-rated",
        element: <TopRatedPage />,
      },
      {
        path: "movies/now-playing",
        element: <NowPlaying />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
