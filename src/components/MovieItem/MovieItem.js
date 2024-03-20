import React from 'react';

function MovieItem({ movie, onMovieSelect }) {
  return (
    <div className='movie-item' key={movie.episode_id}>
      {/* //Call back props was not sent to parent */}
      <img src={`/imgs/${movie.title}.jpg`} alt=''></img>
      <button onClick={() => onMovieSelect(movie)}>
        {movie.title}
      </button>
    </div>
  );
}

export default MovieItem;