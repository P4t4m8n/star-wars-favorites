import React from 'react';
import MovieItem from '@/components/MovieItem/MovieItem';

function MovieList({ onMovieSelect, movies }) {

  return (
    <ul className='movie-list flex'>
      {
        movies.map(movie => (
          <MovieItem
            key={movie.episode}
            movie={movie}
            onMovieSelect={onMovieSelect} />
        ))

      }
    </ul>
  );
}

export default MovieList;
