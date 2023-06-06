import React, {useEffect, useState} from 'react';
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/trending/all/day?api_key=92579eaeaad24968effaadd0d340af1d"


const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=92579eaeaad24968effaadd0d340af1d&query=";

 
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
   getMovies(FEATURED_API)
  }, []);

  const getMovies = (API) =>  {
     fetch(API)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setMovies(data.results)}
      );
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies (SEARCH_API + searchTerm);
      // fetch(SEARCH_API + searchTerm)
      //     .then(res => res.json())
      //     .then(data => {
      //       console.log(data);
      //       setMovies(data.results)}
      //       );
     setSearchTerm("");
    }
    
  }

  

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
     <header>
      <form onSubmit={handleOnSubmit}>
        <input type='search' 
        className='search' 
        placeholder='Search...'  
        value={searchTerm}
        onChange={handleOnChange} 
        />
      </form>
  
  </header>
    <div className='movie-container'>
     
      {
        movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie}
        />)
      }
    </div>
    </>
   
  );
}

export default App;
