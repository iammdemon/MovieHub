import { useState, useEffect } from 'react';
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './components/MovieCard';

//ae5c2c7a

const API_URL = "http://www.omdbapi.com?apikey=ae5c2c7a";

// const movie = {
//     "Title": "Avengers: Endgame",
//     "Year": "2019",
//     "imdbID": "tt4154796",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
// }

const App = () => {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  return(
    <>
      <div className='app'>
        <h1>MovieHUB</h1>

        <div className='search'>
          <input placeholder='Search for Movies' value={search} onChange={(e) => setSearch(e.target.value)}/>
          <img src={SearchIcon} alt='Search Icon'
            onClick={() => searchMovies(search)}
          />
        </div>

        {movies?.length > 0
            ? (
                <div className='container'>
                  {movies.map((movie) => (
                    <MovieCard movie={movie} />
                  ))}
                </div>
              ) : (
                <div className='empty'>
                  <h2>No Movies Found</h2>
                </div>
              )
        }
      </div>
    </>
  )
}

export default App
