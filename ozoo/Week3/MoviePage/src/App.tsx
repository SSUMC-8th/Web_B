import './App.css'
import MoviesPage from './pages/MoviePage';



function App() {
  console.log(import.meta.env.VITE_API_KEY)
    return (
      <>
      <MoviesPage />
    </>
    );
}

export default App
