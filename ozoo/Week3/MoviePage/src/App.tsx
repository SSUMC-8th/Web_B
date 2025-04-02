import './App.css'
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviePage';
import NotFound from "./pages/NotFound.tsx";
import RootLayout from "./layout/root-layout.tsx";
import MovieDetailPage from './pages/MovieDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
      path: '/',
      element: <RootLayout/>,
      errorElement: <NotFound/>,
      children: [
          {
              
              element: <HomePage/>,
              index: true,
          },{
            path: 'movies',
            element: <MoviesPage />,
          },
          {
            path: 'movies/:category',
            element: <MoviesPage/>
          },{
            path: 'movies/:=id',
            element: <MovieDetailPage/>
          }
      ],
  },

]);



function App() {
    return <RouterProvider router={router}/>;
    
}

export default App
