import React from 'react';

function MovieItem({ movie, onMovieSelect }) {
  return (
    <li className='movie-item' key={movie.episode_id}>
      {/* //Call back props was not sent to parent */}
      <img src={`/imgs/${movie.title}.jpg`} alt=''></img>
      <button onClick={() => onMovieSelect(movie)}>
        {movie.title}
      </button>
    </li>
  );
}

export default MovieItem;